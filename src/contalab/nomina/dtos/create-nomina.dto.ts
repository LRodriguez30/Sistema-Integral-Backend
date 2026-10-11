import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsString } from "class-validator";
import { EstadosNomina } from "../enums/estados-nomina.enum";

export class CreateNominaDTO {
    @Type(() => Date)
    @IsDate()
    periodo_inicio!: Date;

    @Type(() => Date)
    @IsDate()
    periodo_fin!: Date;

    @Type(() => Date)
    @IsDate()
    fecha_pago!: Date;

    @IsEnum(EstadosNomina)
    estado!: EstadosNomina;
}