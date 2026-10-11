import { IsNumber, IsOptional } from "class-validator";

export class UpdateDetallePedidoDTO {
    @IsOptional()
    @IsNumber()
    producto_id?: number;

    @IsOptional()
    @IsNumber()
    cantidad!: number;

    @IsOptional()
    @IsNumber()
    precio_unitario!: number;
}