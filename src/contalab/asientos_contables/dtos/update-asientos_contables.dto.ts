import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoOrigen } from '../enums/tipo-origen.enum';

export class UpdateAsientosContablesDTO {
    @IsOptional()
    @IsDate()
    fecha!: Date;

    @IsOptional()
    @IsString()
    concepto!: string;

    @IsOptional()
    @IsEnum(TipoOrigen)
    tipo_origen!: TipoOrigen;

    @IsOptional()
    @IsBoolean()
    estado!: boolean;
}