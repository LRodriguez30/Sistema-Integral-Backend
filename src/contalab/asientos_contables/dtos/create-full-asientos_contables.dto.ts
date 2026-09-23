import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateAsientosContablesDTO {
    @ValidateNested()
    @Type(() => CreateAsientosContablesDTO)
    asiento_contable!: CreateAsientosContablesDTO;

    
}