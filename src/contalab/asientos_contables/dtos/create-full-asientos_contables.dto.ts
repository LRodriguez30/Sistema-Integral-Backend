import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateAsientosContablesDTO } from './create-asientos_contables.dto';
import { CreateDetallesAsientosContablesDTO } from '../../detalles_asientos_contables/dtos/create-detalles_asientos_contables.dto';

export class CreateFullAsientosContablesDTO {
    @ValidateNested()
    @Type(() => CreateAsientosContablesDTO)
    asiento_contable!: CreateAsientosContablesDTO;

    @ValidateNested({ each: true })
    @Type(() => CreateDetallesAsientosContablesDTO)
    detalles_asientos_contables!: CreateAsientosContablesDTO[];
}