import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { IsRUC } from "../validators/is-ruc.validator";

export class CreateClientesDTO {
    @IsString()
    nombre_cliente!: string;

    @IsString()
    apellido_cliente!: string;

    @IsString()
    direccion_cliente!: string;

    @IsPhoneNumber()
    telefono_cliente?: string;

    @IsEmail()
    correo_cliente!: string;

    @Type(() => Date)
    @IsDate()
    fecha_registro_cl!: Date;

    @IsOptional()
    @IsString()
    nombre_empresa?: string;

    @IsOptional()
    @IsString()
    @IsRUC()
    ruc?: string;

    @IsBoolean()
    activo!: boolean;
}