import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateSqlServerPersonasDTO {

    @IsString()
    @MinLength(2)
    primerNombre!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundoNombre!: string;

    @IsString()
    @MinLength(2)
    primerApellido!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundoApellido!: string;

    @IsString()
    @IsPhoneNumber()
    telefono!: string;
}