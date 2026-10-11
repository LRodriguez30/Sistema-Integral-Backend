import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MetodosDePago } from "../enums/metodos-de-pago.enum";
import { EstadosCobro } from "../enums/estados-cobro.enum";

export class CreateCobrosDTO {
    @IsNumber()
    cliente_id!: number;

    @IsNumber()
    usuario_id!: number;

    @Type(() => Date)
    @IsDate()
    fecha_cobro!: Date;

    @IsEnum(MetodosDePago)
    metodo_pago!: MetodosDePago;

    @IsOptional()
    @IsString()
    referencia?: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsEnum(EstadosCobro)
    estado!: EstadosCobro;
}