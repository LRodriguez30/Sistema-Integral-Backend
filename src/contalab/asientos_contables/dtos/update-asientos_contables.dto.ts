import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoOrigen } from '../enums/tipo-origen.enum';
import { Type } from 'class-transformer';

export class UpdateAsientosContablesDTO {
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fecha!: Date;

    @IsOptional()
    @IsString()
    concepto!: string;

    @IsOptional()
    @IsEnum(TipoOrigen)
    tipo_origen!: TipoOrigen;
}