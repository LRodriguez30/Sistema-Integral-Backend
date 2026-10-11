import { IsString } from "class-validator";

export class CreateCategoriaProductosDTO {
    @IsString()
    nombre_categoria!: string;
}