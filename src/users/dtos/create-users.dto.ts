import { IsEmail, IsEnum, IsNumber, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class CreateUsersDTO {
    @IsString()
    @MinLength(2)
    nombre_usuario!: string;

    @IsEmail()
    correo_electronico!: string;

    @IsString()
    @MinLength(8)
    contraseña!: string;

    @IsEnum(UsersRole)
    rol_id!: UsersRole;
}