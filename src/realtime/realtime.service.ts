import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { RefreshTokensService } from '../auth/refresh_tokens/refresh_tokens.service';
import { SupabaseService } from '../supabase/supabase.service';
import { MessagesService } from '../messages/messages.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class RealtimeService {
    private readonly supabaseClient: SupabaseClient;

    // userId -> socketId
    // Set<string>
    private userSockets = new Map<string, Set<string>>();

    // userId -> timestamp last activity
    private lastActive = new Map<string, number>();

    private disconnectReasons = new Map<string, string>();

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly authService: AuthService,
        private readonly refreshTokensService: RefreshTokensService,
        private readonly messagesService: MessagesService,
        private readonly auditService: AuditService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    private server!: Server;

    setServer(server: Server) {
        this.server = server;
    }

    // Valida el access token del emisor
    async validateUser(accessToken: string) {
        const { user } = await this.authService.validateAccessToken(accessToken);
        const refreshTokenInDB = await this.refreshTokensService.getByUserId(user.id);

        if (refreshTokenInDB.revoked) {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Token revoked...'
            });
        }

        return { user, refreshTokenInDB };
    }


    // =========================
    // PRESENCIA
    // =========================
    registerUser(userId: string, socketId: string) {
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }

        this.userSockets.get(userId)!.add(socketId);
        this.lastActive.set(socketId, Date.now());
    }

    removeUser(userId: string, socketId) {
        const sockets = this.userSockets.get(userId);

        if (!sockets) return;

        sockets.delete(socketId);
        this.lastActive.delete(socketId);

        if (sockets.size === 0) {
            this.userSockets.delete(userId);
        }
    }

    updateActivity(socketId: string) {
        this.lastActive.set(socketId, Date.now());
    }

    getDisconnectionReason(socketId: string) {
        const reason = this.disconnectReasons.get(socketId);
        this.disconnectReasons.delete(socketId);
        return reason;
    }

    setDisconnectionReason(socketId: string, reason: string) {
        this.disconnectReasons.set(socketId, reason);
    }

    startPresenceLoop() {
        setInterval(() => {
            const now = Date.now();

            for (const [userId, sockets] of this.userSockets.entries()) {

                let hasActiveSocket = false;

                // Si entre sus dispositivos hay uno conectado
                for (const socketId of sockets) {
                    const last = this.lastActive.get(socketId);
                    if (!last) continue;
                    if (last && (now - last) > 3600000) {
                        // Segundos Inactivo
                        this.disconnectReasons.set(socketId, 'Inactivity');
                        this.server.sockets.sockets.get(socketId)?.disconnect(true);

                        sockets.delete(socketId);
                        this.lastActive.delete(socketId);
                        continue;
                    }

                    if (last && (now - last) < 60000) {
                        // Usuario activo en los últimos 60 segundos
                        hasActiveSocket = true;
                    }
                }

                // No marcar inactivo si hay al menos uno en línea
                if (!hasActiveSocket) {
                    this.server.emit('user-idle', { userId });
                }
            }

        }, 5000);
    }

    // ============================================
    // REALTIME SERVICE
    // ============================================

    async createMessage(data: {
        chat_id: string;
        group_id?: string;
        sender_id: string;
        text: string;
        type?: 'text' | 'image' | 'file' | 'system';
        attachments?: any[];
        reply_to?: string;
    }) {
        const message = await this.messagesService.create({
            chat_id: data.chat_id ?? null,
            group_id: data.group_id ?? null,
            sender_id: data.sender_id,
            type: data.type ?? 'text',
            content: {
                text: data.text
            },
            attachments: data.attachments ?? [],
            reply_to: data.reply_to ?? null,
            status: {
                sent: true,
                delivered: false,
                read: false
            },
            created_at: new Date(),
            edited_at: null,
            deleted_at: null
        });

        const plainMessage = message.toObject();

        await this.auditService.log({
            entity: 'messages',
            entity_id: message._id.toString(),
            operation: 'create',
            actor_id: data.sender_id,
            before: null,
            after: plainMessage,
            context: {
                source: 'websocket',
                reason: 'new message'
            }
        });

        return plainMessage;
    }

    /**
     * 🔄 Construye payload estándar para sockets
     */
    buildEventPayload(data: any) {
        return {
            id: data.id,
            content: data.content,
            createdAt: data.created_at,
        };
    }
}