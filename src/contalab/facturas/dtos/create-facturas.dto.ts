import { IsDate, IsEnum, IsNumber } from "class-validator";
import { EstadosFactura } from "../enums/estados-factura.enum";
import { Type } from "class-transformer";

export class CreateFacturasDTO {
    @IsNumber()
    cliente_id!: number;

    @IsNumber()
    pedido_id!: number;

    @IsNumber()
    usuario_id?: number;

    @Type(() => Date)
    @IsDate()
    fecha!: Date;

    @IsEnum(EstadosFactura)
    estado!: EstadosFactura;
}