import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

/**
 * Datos necesarios para actualizar un token de recuperación:
 * - Expiración
 * - Última actividad
 * - Si válido o inválido
 */
export class UpdateRefreshTokensDTO {
  @IsOptional()
  @IsDateString()
  expires_at?: Date;

  @IsOptional()
  @IsDateString()
  last_activity_at?: Date;

  @IsOptional()
  @IsBoolean()
  revoked?: boolean;
}