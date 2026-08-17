import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayDisconnect,
    SubscribeMessage,
    OnGatewayConnection,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import * as cookie from 'cookie';
import { DynamicRoomDTO } from './dtos/dynamic_room.dto';
import { ErrorCodes } from './enums/error-codes.enum';
import { SendMessagesDTO } from './dtos/send-messages.dto';

/**
 * Gateway de WebSockets
 * - Maneja conexiones
 * - Recibe eventos del frontend
 * - Emite eventos a sockets / rooms
 */
@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true
    }, // FUNCIONA SOLO EN DESARROLLO
    // cors: {
    //   origin: ['https://tusitio.com'],
    //   credentials: true,
    // }, FUNCIONA EN PRODUCCIÓN
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    /**
     * Instancia del servidor Socket.IO
     * Permite emitir eventos
     */
    @WebSocketServer()
    server!: Server;

    afterInit() {
        this.realtimeService.setServer(this.server);
        this.realtimeService.startPresenceLoop();
    }

    /**
     * Inyectamos el servicio
     * (lógica de negocio y base de datos)
     */
    constructor(
        private readonly realtimeService: RealtimeService
    ) { }


    // =================================
    // CICLO DE CONEXIÓN Y DESCONEXIÓN
    // =================================

    // Cuándo un usuario se conecta
    async handleConnection(client: Socket) {
        const now = Date.now();

        // Revisar si se obtienen cookies de los headers
        const cookieHeader = client.handshake.headers.cookie;

        if (!cookieHeader) {
            const payload = {
                statusCode: 401,
                error: 'Unauthorized',
                message: "Authentication cookies are required...",
                code: ErrorCodes.eC40110,
                timestamp: new Date().toISOString()
            };
            const reason = "Access denied";
            return this.forceDisconnect(client, payload, reason);
        }

        // Revisar si la cookie lleva el token
        const cookies = cookie.parse(cookieHeader);
        const accessToken = cookies['accessToken'];

        if (!accessToken) {
            const payload = {
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Access token missing...',
                code: ErrorCodes.eC40120,
                timestamp: new Date().toISOString()
            };
            const reason = "Access denied";
            return this.forceDisconnect(client, payload, reason);
        }

        // Validamos el token con el sistema de autenticación
        let currentUser, refreshToken;

        try {
            const { user, refreshTokenInDB } = await this.realtimeService.validateUser(accessToken);

            currentUser = user;
            refreshToken = refreshTokenInDB;
        }
        catch (e) {
            const response = (e as any).response;

            const statusCode = response.statusCode;
            const error = response.error;
            const message = response.message;

            const payload = {
                statusCode,
                error,
                message,
                code: `${ErrorCodes.eC40121} or ${ErrorCodes.eC40122}`,
                timestamp: new Date().toISOString()
            };
            const reason = "Access denied";
            return this.forceDisconnect(client, payload, reason);
        }

        if (!currentUser) {
            const payload = {
                statusCode: 404,
                error: 'Not Found',
                message: 'User not found...',
                code: ErrorCodes.eC40410,
                timestamp: new Date().toISOString()
            };
            const reason = "Invalid user";
            return this.forceDisconnect(client, payload, reason);
        }

        if (!refreshToken) {
            const payload = {
                statusCode: 404,
                error: 'Unauthorized',
                message: 'Session not found...',
                code: ErrorCodes.eC40420,
                timestamp: new Date().toISOString()
            };
            const reason = "Invalid session";
            return this.forceDisconnect(client, payload, reason);
        }

        // Revisar si no ha expirado su sesión en BD
        const expiresAt = new Date(refreshToken.expires_at).getTime();
        const timeLeft = expiresAt - now;

        if (timeLeft <= 0) {
            client.emit('session-expired', () => {
                const reason = "Session expired";
                this.realtimeService.setDisconnectionReason(client.id, reason);
                return client.disconnect();
            });
        }

        // LUEGO DE MANEJAR ERRORES PROCEDER A REGISTRAR DATOS

        // Guardamos el id en la sesión activa del socket
        client.data.userId = currentUser.id;
        const userId = client.data.userId;

        // Registrar el socket correspondiente al usuario (dispositivo o ventana)
        this.realtimeService.registerUser(userId, client.id);

        client.data.firstSeen = Date.now();
        client.data.lastActive = Date.now();
        client.data.refreshTokenExpirationAt = refreshToken.expires_at;

        // Anunciar que el usuario se conectó
        this.server.emit('user-online', {
            userId,
            firstSeen: new Date(client.data.firstSeen)
        });

        // Visualizar el usuario como conectado
        console.log(`User ${currentUser.email} connected`)
    }

    // Cuándo un usuario se desconecta
    async handleDisconnect(client: Socket) {
        // Obtener el usuario asociado
        const userId = client.data.userId;

        // Obtener razón de su desconexión
        let reason = this.realtimeService.getDisconnectionReason(client.id);
        if (!reason) reason = "Disconnected";

        // Visualizar usuario como desconectado
        if (!userId) {
            console.log(`Client ${client.id} disconnected\tReason: ${reason}`);
            return;
        };

        // Quitar de los sockets activos
        this.realtimeService.removeUser(userId, client.id);

        if (reason === "Inactivity") {
            client.emit('inactivity', {
                message: 'Session closed due to inactivity',
                code: 'E_INACTIVITY'
            });
        }

        // Anunciar que el usuario se desconectó
        this.server.emit('user-offline', { userId, lastSeen: new Date() });
        console.log(`User ${userId} disconnected\tReason: ${reason ? reason : "unknown"}`);
    }


    private forceDisconnect(
        client: Socket,
        payload: any,
        reason: string
    ) {
        this.realtimeService.setDisconnectionReason(client.id, reason);

        client.emit(
            'auth-failed',
            payload,
            () => {
                client.disconnect(true);
            }
        );
    }


    private markActive(client: Socket) {
        this.realtimeService.updateActivity(client.id);
    }


    // =================================
    // CANALES Y OTRAS FUNCIONALIDADES
    // =================================

    // SALAS
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: DynamicRoomDTO
    ) {
        this.markActive(client);
        const dto =
            typeof payload === 'string'
                ? JSON.parse(payload)
                : payload;

        const { requestedRoom, type } = dto;

        const room = `${type}:Room(${requestedRoom})`;
        client.join(room);
        console.log(`User with id '${client.data.userId}' joined the room '${room}'...`);
    }

    @SubscribeMessage('leaveRoom')
    async handleLeaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: DynamicRoomDTO
    ) {
        this.markActive(client);
        const dto =
            typeof payload === 'string'
                ? JSON.parse(payload)
                : payload;

        const { requestedRoom, type } = dto;

        const room = `${type}:Room(${requestedRoom})`;
        client.leave(room);
        console.log(`User with id '${client.data.userId}' left the room...`);
    }


    // TYPING
    @SubscribeMessage('typing')
    handleTyping(client: Socket, dto: DynamicRoomDTO) {
        this.markActive(client);
        const userId = client.data.userId;

        const room = `${dto.type}:${dto.requestedRoom}`;

        this.server
            .to(room)
            .emit('user-typing', { userId })

        console.log(`User with id '${userId}' is writing...`);
    }


    // STOP TYPING
    @SubscribeMessage('stopTyping')
    handleStopTyping(client: Socket, dto: DynamicRoomDTO) {
        this.markActive(client);
        const userId = client.data.userId;

        const room = `${dto.type}:${dto.requestedRoom}`;

        this.server
            .to(room)
            .emit('user-stop-typing', { userId })

        console.log(`User with id '${userId}' stopped writting...`);
    }


    @SubscribeMessage('activity')
    handleActivity(client: Socket) {
        console.log(`User '${client.data.userId}' is active!`);
        this.markActive(client);
    }




    // ============================================
    // MENSAJES EN TIEMPO REAL
    // ============================================

    @SubscribeMessage('message')
    async handleSendMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: SendMessagesDTO
    ) {
        this.markActive(client);
        const dto =
            typeof payload === 'string'
                ? JSON.parse(payload)
                : payload;

        const userId = client.data.userId;

        if (!userId) {
            client.emit('message-error', {
                message: 'Unauthorized',
                code: 'E_UNAUTHORIZED'
            });
            return;
        }

        const room = `${dto.room_type}:Room(${dto.chat_id})`;

        const message = await this.realtimeService.createMessage({
            chat_id: dto.chat_id,
            group_id: dto.group_id,
            sender_id: userId,
            text: dto.content,
            type: dto.type,
            attachments: dto.attachments,
            reply_to: dto.reply_to
        });

        this.server.to(room).emit('newMessage', message);

        console.log(
            `User '${userId}' sent message '${message._id}' to chat '${dto.chat_id} for room '${room}''`
        );

        return {
            success: true,
            message
        };
    }
}