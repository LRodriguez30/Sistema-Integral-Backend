import { IsBoolean, IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { IsRUC } from "../../clientes/validators/is-ruc.validator";

export class CreateProveedoresDTO {
    @IsString()
    nombre_empresa!: string;

    @IsRUC()
    ruc!: string;

    @IsPhoneNumber()
    telefono!: string;

    @IsEmail()
    correo!: string;

    @IsString()
    direccion!: string;

    @IsBoolean()
    estado!: boolean;
}