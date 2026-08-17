import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { RolesType } from "../enums/roles.enum";

export class UpdateSqlServerRolesDTO {

    @IsEnum(RolesType)
    @IsOptional()
    nombreRol!: RolesType;

    @IsString()
    @IsOptional()
    descripcion!: string;

    @IsBoolean()
    @IsOptional()
    estado!: boolean;
}