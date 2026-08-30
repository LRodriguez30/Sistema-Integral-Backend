import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class CreateSqlServerUsersDTO {
    @IsNumber()
    persona_id!: number;

    @IsString()
    @MinLength(2)
    nombre_usuario!: string;

    @IsEmail()
    correo_electronico!: string;

    @IsString()
    @MinLength(8)
    contraseña!: string;

    @IsNumber()
    rol_id!: number;

    @IsBoolean()
    estado!: boolean;
}