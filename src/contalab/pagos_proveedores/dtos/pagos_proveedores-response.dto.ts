import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PagosProveedoresResponseDTO {
    @Expose()
    pago_id!: number;

    @Expose()
    proveedor_id!: number;

    @Expose()
    usuario_id!: number;

    @Expose()
    fecha_pago!: Date;

    @Expose()
    metodo_pago!: string;

    @Expose()
    referencia?: string;

    @Expose()
    observaciones?: string;

    @Expose()
    estado!: string;
}