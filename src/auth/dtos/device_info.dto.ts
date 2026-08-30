import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Dispositivo que solicita datos del backend:
 * - Tipo de dispositivo ( Escritorio, Móvil... )
 * - Sistema operativo ( Windows, macOS, Android... )
 * - Navegador ( Chrome, Brave, Microsoft Edge... )
 */
export class DeviceInfoDTO {
  @IsString()
  @IsNotEmpty()
  deviceType!: string; // desktop | mobile | tablet

  @IsString()
  @IsNotEmpty()
  os!: string; // Windows, macOS, Android, iOS

  @IsOptional()
  @IsString()
  browser?: string; // Chrome, Brave, Microsoft Edge, Opera, Firefox, Safari
}
