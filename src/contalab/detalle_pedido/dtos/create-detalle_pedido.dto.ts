import { IsNumber, IsOptional } from "class-validator";

export class CreateDetallePedidoDTO {
    @IsNumber()
    pedido_id!: number;

    @IsOptional()
    @IsNumber()
    producto_id?: number;

    @IsNumber()
    cantidad!: number;

    @IsNumber()
    precio_unitario!: number;
}