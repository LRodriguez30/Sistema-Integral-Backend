import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUsersDTO } from './create-users.dto';
import { CreatePersonasDTO } from '../../personas/dtos/create-personas.dto';

export class CreateFullUserDTO {

    @ValidateNested()
    @Type(() => CreatePersonasDTO)
    persona!: CreatePersonasDTO;

    @ValidateNested()
    @Type(() => CreateUsersDTO)
    usuario!: CreateUsersDTO;
}