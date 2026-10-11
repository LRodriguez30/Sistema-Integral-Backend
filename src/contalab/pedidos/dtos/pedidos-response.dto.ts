import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PedidosResponseDTO {
    @Expose()
    pedido_id!: number;

    @Expose()
    cliente_id!: number;

    @Expose()
    usuario_id?: number;

    @Expose()
    fecha_pedido!: Date;

    @Expose()
    estado_pedido!: string;

    @Expose()
    direccion_entrega!: string;

    @Expose()
    estado_envio!: string;

    @Expose()
    fecha_salida!: Date;

    @Expose()
    fecha_entrega!: Date;

    @Expose()
    observaciones!: string;
}