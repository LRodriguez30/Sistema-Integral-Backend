import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TipoOrigen } from '../enums/tipo-origen.enum';

export class CreateAsientosContablesDTO {
    @IsNumber()
    usuario_id!: number;

    @IsDate()
    fecha!: Date;

    @IsString()
    concepto!: string;

    @IsEnum(TipoOrigen)
    tipo_origen!: TipoOrigen;

    @IsBoolean()
    estado!: boolean;

    @IsNumber()    
    total_debe!: number;

    @IsNumber()
    total_haber!: number;
}