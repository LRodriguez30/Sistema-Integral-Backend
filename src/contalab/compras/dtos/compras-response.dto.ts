import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ComprasResponseDTO {
    @Expose()
    compra_id!: number;

    @Expose()
    proveedor_id!: number;

    @Expose()
    usuario_id?: number;

    @Expose()
    fecha!: Date;

    @Expose()
    estado!: string;
}