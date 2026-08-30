import { Exclude, Expose } from 'class-transformer';
import { UsersRole } from '../../../users/enums/users-role.enum';

/**
 * Respuesta emitida por el backend según roles:
 * - ID del token
 * - ID del usuario
 * - Clave secreta del token
 * - Información del dispositivo
 * - Expiración
 * - Si es válido o inválido
 * - Última actividad
 * - Extendido hasta...
 */
@Exclude()
export class RefreshTokensResponseDTO {
    @Expose()
    id!: string;

    @Expose()
    user_id!: string;

    @Expose()
    token_hash!: string;

    @Expose()
    device_info!: object;

    @Expose()
    expires_at!: string;

    @Expose()
    revoked!: boolean;
    
    @Expose()
    last_activity_at!: string | null;

    @Expose()
    last_extended_at!: string;
}