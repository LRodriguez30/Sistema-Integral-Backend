import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FacturasResponseDTO {
    @Expose()
    factura_id!: number;

    @Expose()
    cliente_id!: number;

    @Expose()
    pedido_id!: number;

    @Expose()
    usuario_id?: number;

    @Expose()
    fecha!: Date;

    @Expose()
    estado!: string;
}