import { Expose, Exclude } from "class-transformer";

@Exclude()
export class PersonasResponseDTO {
    @Expose()
    persona_id!: number;

    @Expose()
    primer_nombre!: string;

    @Expose()
    segundo_nombre!: string;

    @Expose()
    primer_apellido!: string;

    @Expose()
    segundo_apellido!: string;

    @Expose()
    telefono!: string;
}