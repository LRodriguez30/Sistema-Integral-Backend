import { IsNumber } from "class-validator";

export class CreateDetalleNominaDTO {
    @IsNumber()
    nomina_id!: number;

    @IsNumber()
    empleado_id!: number;

    @IsNumber()
    salario_base!: number;
    
    @IsNumber()
    horas_extras!: number;
}