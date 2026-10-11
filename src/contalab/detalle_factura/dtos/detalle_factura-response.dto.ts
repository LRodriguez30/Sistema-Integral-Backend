import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetalleFacturaResponseDTO {
    @Expose()
    detalle_factura_id!: number;

    @Expose()
    factura_id!: number;

    @Expose()
    producto_id!: number;

    @Expose()
    cantidad!: number;

    @Expose()
    precio_unitario!: number;
}