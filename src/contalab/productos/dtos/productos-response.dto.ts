import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductosResponseDTO {
    @Expose()
    producto_id!: number;

    @Expose()
    codigo!: string;

    @Expose()
    nombre_producto!: string;

    @Expose()
    descripcion?: string;

    @Expose()
    precio_venta!: number;

    @Expose()
    costo_unitario!: number;

    @Expose()
    categoria_id!: number;

    @Expose()
    estado!: boolean;
}