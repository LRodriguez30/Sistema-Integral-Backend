import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CobrosResponseDTO {
    @Expose()
    cobro_id!: number;

    @Expose()
    cliente_id!: number;

    @Expose()
    usuario_id!: number;

    @Expose()
    fecha_cobro!: Date;

    @Expose()
    metodo_pago!: string;

    @Expose()
    referencia?: string;

    @Expose()
    observaciones?: string;

    @Expose()
    estado!: string;
}