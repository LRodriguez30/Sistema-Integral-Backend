import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { RolesType } from "../enums/roles.enum";

export class CreateSqlServerRolesDTO {

    @IsEnum(RolesType)
    nombreRol!: RolesType;

    @IsString()
    @IsOptional()
    descripcion!: string;

    @IsBoolean()
    estado!: boolean;
}