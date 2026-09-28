import { IsNumber, IsOptional } from 'class-validator';

export class UpdateDetallesAsientosContablesDTO {
    @IsOptional()
    @IsNumber()
    debe!: number;

    @IsOptional()
    @IsNumber()
    haber!: Date;

    @IsOptional()
    @IsNumber()
    asiento_id!: number;

    @IsOptional()
    @IsNumber()
    cuenta_id!: number;
}