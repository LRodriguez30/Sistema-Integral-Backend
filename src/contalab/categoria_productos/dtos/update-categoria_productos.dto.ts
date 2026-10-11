import { IsOptional, IsString } from "class-validator";

export class UpdateCategoriaProductosDTO {
    @IsOptional()
    @IsString()
    nombre_categoria!: string;
}