import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class CreateSqlServerUsersDTO {
    @IsNumber()
    personaId!: number;

    @IsString()
    @MinLength(2)
    nombreUsuario!: string;

    @IsEmail()
    correoElectronico!: string;

    @IsString()
    @MinLength(8)
    contraseña!: string;

    @IsNumber()
    rolId!: number;

    @IsBoolean()
    estado!: boolean;
}