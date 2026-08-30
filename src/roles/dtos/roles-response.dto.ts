import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RolesResponseDTO {
    @Expose()
    rol_id!: number;

    @Expose()
    nombre_rol!: string;

    @Expose()
    descripcion!: string;

    @Expose()
    estado!: boolean;
}