import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateEmpleadosDTO {
    @IsOptional()
    @IsString()
    cargo!: string;

    @IsOptional()
    @Type(() => Date)
    fecha_ingreso!: Date;

    @IsOptional()
    @IsNumber()
    salario_base!: number;

    @IsOptional()
    @IsBoolean()
    estado!: boolean;
}