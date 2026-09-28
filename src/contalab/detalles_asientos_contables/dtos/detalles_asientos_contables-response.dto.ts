import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class DetallesAsientosContablesResponseDTO {
    @Expose()
    detalle_id!: number;

    @Expose()
    debe!: number;

    @Expose()
    haber!: Date;

    @Expose()
    asiento_id!: number;

    @Expose()
    cuenta_id!: number;
}