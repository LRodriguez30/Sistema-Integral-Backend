import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { DeviceInfoDTO } from './device_info.dto';

/**
 *  Datos necesarios para iniciar sesión:
 *  - Correo Electrónico
 *  - Contraseña
 *  - Información del dispositivo
 */
export class LoginDTO {
    @IsEmail()
    correo_electronico!: string;

    @IsString()
    @IsNotEmpty()
    contraseña!: string;

    @ValidateNested()
    @Type(() => DeviceInfoDTO)
    device_info!: DeviceInfoDTO;
}