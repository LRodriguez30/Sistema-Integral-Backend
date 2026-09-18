import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CatalogoCuentasResponseDTO {
    @Expose()
    cuenta_id!: number;

    @Expose()
    codigo_cuenta!: string;

    @Expose()
    nombre_cuenta!: string;

    @Expose()
    tipo_cuenta!: string;

    @Expose()
    naturaleza!: string;

    @Expose()
    cuenta_padre_id!: number | null;

    @Expose()
    nivel_cuenta!: number;

    @Expose()
    permite_movimiento!: boolean;

    @Expose()
    estado!: boolean;
}