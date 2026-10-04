import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class UpdateNominaDTO {
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    periodo_inicio!: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    periodo_fin!: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fecha_pago!: Date;

    @IsOptional()
    @IsString()
    estado!: string;
}