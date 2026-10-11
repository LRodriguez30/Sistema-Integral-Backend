import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetallePedidoResponseDTO {
    @Expose()
    detalle_pedido_id!: number;

    @Expose()
    pedido_id!: number;

    @Expose()
    producto_id?: number;

    @Expose()
    cantidad!: number;

    @Expose()
    precio_unitario!: number;

    @Expose()
    subtotal!: number;
}