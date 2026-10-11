import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MetodosDePago } from "../../cobros/enums/metodos-de-pago.enum";
import { EstadosPago } from "../enums/estados-pago.enum";

export class CreatePagosProveedoresDTO {
    @IsNumber()
    proveedor_id!: number;

    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @Type(() => Date)
    @IsDate()
    fecha_pago!: Date;

    @IsEnum(MetodosDePago)
    metodo_pago!: MetodosDePago;

    @IsString()
    referencia?: string;

    @IsString()
    observaciones?: string;

    @IsEnum(EstadosPago)
    estado!: EstadosPago;
}