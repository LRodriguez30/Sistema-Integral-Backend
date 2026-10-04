import { IsNumber } from "class-validator";

export class CreateDetalleNominaCalculadoDTO {
    @IsNumber()
    nomina_id!: number;

    @IsNumber()
    empleado_id!: number;

    @IsNumber()
    salario_base!: number;

    @IsNumber()
    salario_quincenal!: number;

    @IsNumber()
    horas_extras!: number;

    @IsNumber()
    ingreso_horas_extras!: number;

    @IsNumber()
    total_ingresos!: number;

    @IsNumber()
    inss_laboral!: number;

    @IsNumber()
    ir!: number;

    @IsNumber()
    total_deducciones!: number;

    @IsNumber()
    salario_neto!: number;

    @IsNumber()
    inatec!: number;

    @IsNumber()
    inss_patronal!: number;

    @IsNumber()
    vacaciones!: number;

    @IsNumber()
    treceavo_mes!: number;

    @IsNumber()
    indemnización!: number;
}