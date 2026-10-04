import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateNominaDTO } from './dtos/create-nomina.dto';
import { UpdateNominaDTO } from './dtos/update-nomina.dto';

@Injectable()
export class NominaService {
    private readonly supabaseClient: SupabaseClient;
    
    constructor(
        private readonly supabaseService: SupabaseService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('nomina')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener las nominas de la BD...");
        }

        return data;
    }

    async getById(nominaId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('nomina')
            .select('*')
            .eq('nomina_id', nominaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la nomina de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la nomina con id '${nominaId}'...`);
        }

        return data;
    }

    async create(dto: CreateNominaDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('nomina')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(error.message, "No se puede crear la nomina en la BD...");
        }

        return data;
    }

    async update(nominaId: number, dto: UpdateNominaDTO) {
        const nominaEnBD = await this.getById(nominaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('nomina')
            .update(dto)
            .eq('nomina_id', nominaId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar la nomina con id '${nominaId}' en la BD...`);
        }

        return data;
    }

    async deleteById(nominaId: number) {
        const nominaEnBD = await this.getById(nominaId);

        const { error } = await this.supabaseClient
            .schema('contalab')
            .rpc('delete_nomina', {
                p_nomina_id: nominaId
            });

        if (error) {
            throw new InternalServerErrorException(
                error.message, 'No se pudo eliminar la nómina'
            );
        }

        return {
            message: 'Nómina eliminada correctamente...'
        };
    }
}
