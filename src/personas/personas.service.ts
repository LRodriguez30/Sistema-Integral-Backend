import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerPersonasDTO } from './dtos/create-sqlserver-personas.dto';
import { UpdateSqlServerPersonasDTO } from './dtos/update-sqlserver-personas.dto';

@Injectable()
export class PersonasService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly prismaService: PrismaService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }


    // -----------------------------------------
    // READ
    // -----------------------------------------

    async sqlServerFindAll() {
        return this.prismaService.personas.findMany();
    }

    // -----------------------------------------
    // CREATE
    // -----------------------------------------

    async sqlServerCreate(dto: CreateSqlServerPersonasDTO) {
        return this.prismaService.personas.create({
            data: {
                PrimerNombre: dto.primerNombre,
                SegundoNombre: dto.segundoNombre,
                PrimerApellido: dto.primerApellido,
                SegundoApellido: dto.segundoApellido,
                Telefono: dto.telefono
            }
        });
    }

    // -----------------------------------------
    // UPDATE
    // -----------------------------------------

    async sqlServerUpdate(dto: UpdateSqlServerPersonasDTO, personaId: number) {
        const data: any = {}

        if (dto.primerNombre !== undefined) {
            data.PrimerNombre = dto.primerNombre;
        }

        if (dto.segundoNombre !== undefined) {
            data.SegundoNombre = dto.segundoNombre;
        }

        if (dto.primerApellido !== undefined) {
            data.PrimerApellido = dto.primerApellido;
        }
        
        if (dto.segundoApellido !== undefined) {
            data.SegundoApellido = dto.segundoApellido;
        }

        this.prismaService.personas.update({
            where: {
                PersonaId: personaId,
            },
            data
        });
    }

    // -----------------------------------------
    // DELETE
    // -----------------------------------------

    async sqlServerDelete(personaId: number) {

        return this.prismaService.personas.delete({
            where: {
                PersonaId: personaId,
            },
        });
    }
}
