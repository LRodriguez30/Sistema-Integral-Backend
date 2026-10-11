import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { EstadosCompra } from "../enums/estados-compra.enum";

export class CreateComprasDTO {
    @IsNumber()
    proveedor_id!: number;

    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @Type(() => Date)
    @IsDate()
    fecha!: Date;

    @IsEnum(EstadosCompra)
    estado!: EstadosCompra;
}