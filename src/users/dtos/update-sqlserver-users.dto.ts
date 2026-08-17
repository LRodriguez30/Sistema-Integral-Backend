import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class UpdateSqlServerUsersDTO {
    @IsString()
    @MinLength(2)
    @IsOptional()
    nombreUsuario!: string;

    @IsNumber()
    @IsOptional()
    rolId!: number;

    @IsBoolean()
    @IsOptional()
    estado!: boolean;
}