import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TipoOrigen } from '../enums/tipo-origen.enum';
import { Type } from 'class-transformer';

export class CreateAsientosContablesDTO {
    @IsNumber()
    usuario_id!: number;

    @Type(() => Date)
    @IsDate()
    fecha!: Date;

    @IsString()
    concepto!: string;

    @IsEnum(TipoOrigen)
    tipo_origen!: TipoOrigen;

    @IsNumber()    
    total_debe!: number;

    @IsNumber()
    total_haber!: number;
}