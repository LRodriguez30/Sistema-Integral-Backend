import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsString } from "class-validator";

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

    @IsString()
    estado!: string;
}