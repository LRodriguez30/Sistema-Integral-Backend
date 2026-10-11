import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MetodosDePago } from "../../cobros/enums/metodos-de-pago.enum";
import { EstadosPago } from "../enums/estados-pago.enum";

export class UpdatePagosProveedoresDTO {
    @IsOptional()
    @IsNumber()
    usuario_id?: number;
    
    @IsOptional()
    @IsString()
    referencia?: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsEnum(EstadosPago)
    estado!: EstadosPago;
}