import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetalleCobroResponseDTO {
    @Expose()
    detalle_cobro_id!: number;

    @Expose()
    cobro_id!: number;

    @Expose()
    factura_id!: number;

    @Expose()
    monto_aplicado!: number;
}