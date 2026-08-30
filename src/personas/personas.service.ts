import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerPersonasDTO } from './dtos/create-sqlserver-personas.dto';
import { UpdateSqlServerPersonasDTO } from './dtos/update-sqlserver-personas.dto';
import { CreatePersonasDTO } from './dtos/create-personas.dto';
import { UpdatePersonasDTO } from './dtos/update-personas.dto';

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




    async findAll() {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('personas')
            .select('*')

        if (error) {
            throw new InternalServerErrorException('No se pueden obtener personas de la BD...')
        }

        return data;
    }

    async findById(personaId: string) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('personas')
            .select('*')
            .eq('persona_id', personaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('No se pueden obtener usuarios de la BD...')
        }

        if (!data) {
            throw new NotFoundException(`Persona con id '${personaId}' no encontrado...`);
        }

        return data;
    }

    async create(dto: CreatePersonasDTO) {

        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('personas')
            .insert({
                primer_nombre: dto.primer_nombre,
                segundo_nombre: dto.segundo_nombre,
                primer_apellido: dto.primer_apellido,
                segundo_apellido: dto.segundo_apellido,
                telefono: dto.telefono
            })
            .select()
            .single()

        if (error) {
            console.log(error)
        }

        return data;
    }

    async updateById(personaId: string, dto: UpdatePersonasDTO) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('personas')
            .update(dto)
            .eq('persona_id', personaId)
            .select()
            .maybeSingle();

        if (error) {
            throw new InternalServerErrorException("No se puede actualizar la persona...");
        }

        if (!data) {
            throw new NotFoundException(`Persona con id '${personaId}' no encontrada...`);
        }

        return data;
    }

    async deleteById(personaId: string) {
        await this.findById(personaId);

        const { error } = await this.supabaseClient
            .schema('core')
            .from('personas')
            .delete()
            .eq('persona_id', personaId)
            .single()

        if (error) {
            throw new InternalServerErrorException('No se puede borrar la persona de la BD...');
        }

        const message = {
            "message": "Persona eliminada correctamente..."
        }

        return message;
    }
}
