import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EmpleadosResponseDTO {
    @Expose()
    empleado_id!: number;

    @Expose()
    persona_id!: number;

    @Expose()
    cargo!: string;

    @Expose()
    fecha_ingreso!: Date;

    @Expose()
    salario_base!: number;

    @Expose()
    estado!: boolean;
}