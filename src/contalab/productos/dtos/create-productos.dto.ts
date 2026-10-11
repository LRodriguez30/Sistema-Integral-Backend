import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { IsCodigoProducto } from "../validators/is-codigo-producto.validator";

export class CreateProductosDTO {
    @IsCodigoProducto()
    codigo!: string;

    @IsString()
    nombre_producto!: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNumber()
    precio_venta!: number;

    @IsNumber()
    costo_unitario!: number;

    @IsNumber()
    categoria_id!: number;

    @IsBoolean()
    estado!: boolean;
}