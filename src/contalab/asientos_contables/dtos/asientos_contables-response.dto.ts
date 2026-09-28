import { Expose, Exclude } from 'class-transformer';
import { TipoOrigen } from '../enums/tipo-origen.enum';

@Exclude()
export class AsientosContablesResponseDTO {
    @Expose()
    asiento_id!: number;

    @Expose()
    usuario_id!: number;

    @Expose()
    fecha!: Date;

    @Expose()
    concepto!: string;

    @Expose()
    tipo_origen!: TipoOrigen;

    @Expose()
    total_debe!: number;

    @Expose()
    total_haber!: number;
}