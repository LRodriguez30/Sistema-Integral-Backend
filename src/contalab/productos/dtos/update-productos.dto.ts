import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { IsCodigoProducto } from "../validators/is-codigo-producto.validator";

export class UpdateProductosDTO {
    @IsOptional()
    @IsCodigoProducto()
    codigo!: string;

    @IsOptional()
    @IsString()
    nombre_producto!: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    precio_venta!: number;

    @IsOptional()
    @IsNumber()
    costo_unitario!: number;

    @IsOptional()
    @IsNumber()
    categoria_id!: number;

    @IsOptional()
    @IsBoolean()
    estado!: boolean;
}