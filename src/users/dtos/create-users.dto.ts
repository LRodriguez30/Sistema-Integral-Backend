import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class CreateUsersDTO {
    @IsString()
    @MinLength(2)
    nombre_usuario!: string;

    @IsNumber()
    persona_id!: number;

    @IsEmail()
    correo_electronico!: string;

    @IsString()
    @MinLength(8)
    contraseña!: string;

    @IsEnum(UsersRole)
    rol_id!: UsersRole;

    @IsOptional()
    @IsBoolean()
    estado!: boolean;
}