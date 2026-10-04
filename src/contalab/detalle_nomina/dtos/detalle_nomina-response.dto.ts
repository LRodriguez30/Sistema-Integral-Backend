import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DetalleNominaResponseDTO {
    @Expose()
    detalle_nomina_id!: number;

    @Expose()
    nomina_id!: number;

    @Expose()
    empleado_id!: number;

    @Expose()
    salario_base!: number;

    @Expose()
    salario_quincenal!: number;

    @Expose()
    horas_extras!: number;

    @Expose()
    ingreso_horas_extras!: number;

    @Expose()
    total_ingresos!: number;

    @Expose()
    inss_laboral!: number;

    @Expose()
    ir!: number;

    @Expose()
    total_deducciones!: number;

    @Expose()
    salario_neto!: number;

    @Expose()
    inatec!: number;

    @Expose()
    inss_patronal!: number;

    @Expose()
    vacaciones!: number;

    @Expose()
    treceavo_mes!: number;

    @Expose()
    indemnización!: number;
}