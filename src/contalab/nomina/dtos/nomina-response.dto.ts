import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NominaResponseDTO {
    @Expose()
    nomina_id!: number;

    @Expose()
    periodo_inicio!: Date;

    @Expose()
    periodo_fin!: Date;

    @Expose()
    fecha_pago!: Date;

    @Expose()
    estado!: string;
}