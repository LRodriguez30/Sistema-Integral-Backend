import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreatePersonasDTO {

    @IsString()
    @MinLength(2)
    primer_nombre!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundo_nombre!: string;

    @IsString()
    @MinLength(2)
    primer_apellido!: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    segundo_apellido!: string;

    @IsString()
    @IsPhoneNumber()
    telefono!: string;
}