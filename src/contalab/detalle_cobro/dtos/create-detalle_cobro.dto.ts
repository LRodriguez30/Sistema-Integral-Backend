import { IsNumber } from "class-validator";

export class CreateDetalleCobroDTO {
    @IsNumber()
    cobro_id!: number;

    @IsNumber()
    factura_id!: number;

    @IsNumber()
    monto_aplicado!: number;
}