import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";


export class CreateEmpleadosDTO {
    @IsNumber()
    persona_id!: number;

    @IsString()
    cargo!: string;

    @Type(() => Date)
    @IsDate()
    fecha_ingreso!: Date;

    @IsNumber()
    salario_base!: number;

    @IsBoolean()
    estado!: boolean;
}