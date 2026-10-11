import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetallePagoProveedorResponseDTO {
    @Expose()
    detalle_pago_id!: number;

    @Expose()
    pago_id!: number;

    @Expose()
    compra_id!: number;

    @Expose()
    monto_aplicado!: number;
}