import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { IsRUC } from "../validators/is-ruc.validator";

export class UpdateClientesDTO {
    @IsOptional()
    @IsString()
    nombre_cliente!: string;

    @IsOptional()
    @IsString()
    apellido_cliente!: string;

    @IsOptional()
    @IsString()
    direccion_cliente!: string;

    @IsOptional()
    @IsPhoneNumber()
    telefono_cliente?: string;

    @IsOptional()
    @IsEmail()
    correo_cliente!: string;

    @IsOptional()
    @IsString()
    nombre_empresa?: string;

    @IsOptional()
    @IsString()
    @IsRUC()
    ruc?: string;

    @IsOptional()
    @IsBoolean()
    activo!: boolean;
}