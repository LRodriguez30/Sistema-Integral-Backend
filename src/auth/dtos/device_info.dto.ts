import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Dispositivo que solicita datos del backend:
 * - Tipo
 * - Nombre
 * - Sistema operativo
 * - Navegador
 */
export class DeviceInfoDTO {
  @IsString()
  @IsNotEmpty()
  deviceType!: string; // desktop | mobile | tablet

  @IsString()
  @IsNotEmpty()
  deviceName!: string; // "Windows - Chrome"

  @IsString()
  @IsNotEmpty()
  os!: string; // Windows, macOS, Android, iOS

  @IsOptional()
  @IsString()
  browser?: string; // Chrome, Firefox, Safari
}
