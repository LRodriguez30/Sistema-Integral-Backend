import { IsNumber } from "class-validator";

export class CreateDetalleFacturaDTO {
    @IsNumber()
    factura_id!: number;

    @IsNumber()
    producto_id!: number;

    @IsNumber()
    cantidad!: number;

    @IsNumber()
    precio_unitario!: number;
}