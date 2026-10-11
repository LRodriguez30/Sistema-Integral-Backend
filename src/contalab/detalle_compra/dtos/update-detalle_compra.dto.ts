import { IsNumber } from "class-validator";

export class UpdateDetalleCompraDTO {
    @IsNumber()
    cantidad!: number;

    @IsNumber()
    costo_unitario!: number;
}