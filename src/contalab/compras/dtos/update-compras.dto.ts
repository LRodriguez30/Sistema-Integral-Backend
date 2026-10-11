import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { EstadosCompra } from "../enums/estados-compra.enum";

export class CreateComprasDTO {
    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @IsEnum(EstadosCompra)
    estado!: EstadosCompra;
}