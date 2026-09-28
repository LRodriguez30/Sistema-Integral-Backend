import { IsNumber } from 'class-validator';

export class CreateDetallesAsientosContablesDTO {
    @IsNumber()
    debe!: number;

    @IsNumber()
    haber!: Date;

    @IsNumber()
    asiento_id!: number;

    @IsNumber()
    cuenta_id!: number;
}