import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { IsRUC } from "../../clientes/validators/is-ruc.validator";

export class UpdateProveedoresDTO {
    @IsOptional()
    @IsString()
    nombre_empresa!: string;

    @IsOptional()
    @IsRUC()
    ruc!: string;

    @IsOptional()
    @IsPhoneNumber()
    telefono!: string;

    @IsOptional()
    @IsEmail()
    correo!: string;

    @IsOptional()
    @IsString()
    direccion!: string;

    @IsOptional()
    @IsBoolean()
    estado!: boolean;
}