import { Exclude, Expose } from 'class-transformer';
import { UsersRole } from '../../../users/enums/users-role.enum';

/**
 * Respuesta emitida por el backend según roles:
 * - ID del token
 * - ID del usuario
 * - Clave secreta del token
 * - Información del dispositivo
 * - Expiración
 * - Fecha de creación (Solo dueño o admins)
 * - Si es válido o inválido
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

    @Expose({groups: [
        UsersRole.Dueño,
        UsersRole.Admin
    ]})
    created_at!: string;

    @Expose({groups: [
        UsersRole.Dueño,
        UsersRole.Admin
    ]})
    revoked!: boolean;
}