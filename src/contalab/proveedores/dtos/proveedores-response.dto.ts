import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProveedoresResponseDTO {
    @Expose()
    proveedor_id!: number;

    @Expose()
    nombre_empresa!: string;

    @Expose()
    ruc!: string;

    @Expose()
    telefono!: string;

    @Expose()
    correo!: string;

    @Expose()
    direccion!: string;

    @Expose()
    estado!: boolean;
}