import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class UpdatePersonasDTO {

    @IsString()
    @MinLength(2)
    @IsOptional()
    primerNombre!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundoNombre!: string;

    @IsString()
    @IsOptional()
    primerApellido!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundoApellido!: string;

    @IsString()
    @IsPhoneNumber()
    @IsOptional()
    telefono!: string;
}