import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RefreshTokensService } from "./refresh_tokens.service";
import { RealtimeGateway } from "../../realtime/realtime.gateway";

/**
 * Servicio cron encargado de eventos en tiempo real:
 * - Evalúa sesiones activas
 * - Extiende sesiones por actividad
 */
@Injectable()
export class RefreshTokensCronService {
    // Requiere del módulo de conexión en tiempo real
    // Requiere del servicio de tokens de recuperación
    constructor(
        private readonly refreshTokensService: RefreshTokensService,
        private readonly realtimeGateway: RealtimeGateway
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        console.log('Evaluando sesiones activas...');

        const now = Date.now();

        let sessions;

        try {
            sessions = await this.refreshTokensService.getManyByRevoked(false);
        } catch (err: unknown) {
            if (err instanceof Error) console.log('[CRON] Error obteniendo sesiones:', err.message);
            return;
        }

        for (const session of sessions) {

            const lastActivity = session.last_activity_at
                ? new Date(session.last_activity_at).getTime()
                : 0;

            const expiresAt = new Date(session.expires_at).getTime();

            const inactivity = now - lastActivity;
            const timeToExpire = expiresAt - now;

            const isActive = inactivity < 30 * 60 * 1000;
            const needsExtension = timeToExpire < 60 * 60 * 1000;

            const canExtend =
                !session.last_extended_at ||
                now - new Date(session.last_extended_at).getTime() > 30 * 60 * 1000;

            if (isActive && needsExtension && canExtend) {

                const newExpiresAt = new Date(now + 60 * 60 * 1000); // +1 hora

                await this.refreshTokensService.updateById(session.id, {
                    expires_at: newExpiresAt,
                    last_extended_at: new Date(now),
                });

                console.log(`Sesión extendida: ${session.user_id}`);
            }
        }
    }
}