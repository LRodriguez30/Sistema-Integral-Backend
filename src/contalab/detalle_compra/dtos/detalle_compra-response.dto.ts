import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetalleCompraResponseDTO {
    @Expose()
    detalle_compra_id!: number;

    @Expose()
    compra_id!: number;

    @Expose()
    producto_id!: number;

    @Expose()
    cantidad!: number;

    @Expose()
    costo_unitario!: number;
}