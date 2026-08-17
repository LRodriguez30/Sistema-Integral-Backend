import { IsBoolean, IsDateString, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

/**
 * Datos necesarios para crear un token de recuperación:
 * - ID del usuario
 * - Clave secreta del token
 * - Información del dispositivo
 * - Expiración
 * - Si válido o inválido
 */
export class CreateRefreshTokensDTO {
    @IsString()
    @IsNotEmpty()
    user_id!: string;

    @IsString()
    @IsNotEmpty()
    token_hash!: string;

    @IsNotEmptyObject()
    device_info!: object;

    @IsString()
    @IsNotEmpty()
    expires_at!: string;

    @IsBoolean()
    @IsDefined()
    revoked!: boolean;
}