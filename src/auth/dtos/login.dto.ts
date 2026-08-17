import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { DeviceInfoDTO } from './device_info.dto';

/*
    Datos necesarios para iniciar sesión
    - Correo
    - Contraseña
    - Información del dispositivo
*/
export class LoginDTO {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password_hash!: string;

    @ValidateNested()
    @Type(() => DeviceInfoDTO)
    device_info!: DeviceInfoDTO;
}