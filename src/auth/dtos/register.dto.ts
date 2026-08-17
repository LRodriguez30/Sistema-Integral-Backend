import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateUsersDTO } from "../../users/dtos/create-users.dto";
import { DeviceInfoDTO } from "./device_info.dto";

/**
 * Datos necesarios para registrarse:
 * - Usuario
 * - Información del dispositivo
 */
export class RegisterDTO {
  @ValidateNested()
  @Type(() => CreateUsersDTO)
  user!: CreateUsersDTO;

  @ValidateNested()
  @Type(() => DeviceInfoDTO)
  device_info!: DeviceInfoDTO;
}