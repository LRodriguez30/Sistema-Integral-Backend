import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateUsersDTO } from "../../users/dtos/create-users.dto";
import { DeviceInfoDTO } from "./device_info.dto";
import { CreatePersonasDTO } from "../../personas/dtos/create-personas.dto";

/**
 * Datos necesarios para registrarse:
 * - Perfil como persona
 * - Usuario
 * - Información del dispositivo
 */
export class RegisterDTO {
  @ValidateNested()
  @Type(() => CreatePersonasDTO)
  persona!: CreatePersonasDTO;

  @ValidateNested()
  @Type(() => CreateUsersDTO)
  user!: CreateUsersDTO;

  @ValidateNested()
  @Type(() => DeviceInfoDTO)
  device_info!: DeviceInfoDTO;
}