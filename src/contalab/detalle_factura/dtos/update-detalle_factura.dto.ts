import { IsNumber } from "class-validator";

export class UpdateDetalleFacturaDTO {
    @IsNumber()
    cantidad!: number;

    @IsNumber()
    precio_unitario!: number;
}