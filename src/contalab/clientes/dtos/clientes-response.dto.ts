import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ClientesResponseDTO {
    @Expose()
    cliente_id!: number;

    @Expose()
    nombre_cliente!: string;

    @Expose()
    apellido_cliente!: string;

    @Expose()
    direccion_cliente!: string;

    @Expose()
    telefono_cliente?: string;

    @Expose()
    correo_cliente!: string;

    @Expose()
    fecha_registro_cl!: Date;

    @Expose()
    nombre_empresa?: string;

    @Expose()
    ruc?: string;

    @Expose()
    activo!: boolean;
}