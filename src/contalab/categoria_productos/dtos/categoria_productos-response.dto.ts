import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoriaProductosResponseDTO {
    @Expose()
    categoria_id!: number;

    @Expose()
    nombre_categoria!: string;
}