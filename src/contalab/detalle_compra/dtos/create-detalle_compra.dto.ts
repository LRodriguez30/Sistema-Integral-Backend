import { IsNumber } from "class-validator";

export class CreateDetalleCompraDTO {
    @IsNumber()
    compra_id!: number;

    @IsNumber()
    producto_id!: number;

    @IsNumber()
    cantidad!: number;

    @IsNumber()
    costo_unitario!: number;
}