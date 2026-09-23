import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateAsientosContablesDTO } from './dtos/create-asientos_contables.dto';
import { UpdateAsientosContablesDTO } from './dtos/update-asientos_contables.dto';

@Injectable()
export class AsientosContablesService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los asientos contables de la BD...");
        }

        return data;
    }

    async getByUserId(userId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede encontrar el asiento contable en BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el asiento contable creado por el usuario con id ${userId}...`);
        }

        return data;
    }

    async create(dto: CreateAsientosContablesDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el asiento contable en BD...");
        }

        return data;
    }

    async update(asientoId: number, dto: UpdateAsientosContablesDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .update(dto)
            .eq('asiento_id', asientoId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede actualizar el asiento contable en BD...");
        }

        return data;
    }

    // const { data, error } = await supabase.rpc(
    //     'crear_asiento_contable',
    //     {
    //         p_usuario_id: 1,
    //         p_fecha: '2026-09-22',
    //         p_concepto: 'Compra de equipo',
    //         p_tipo_origen: 'COMPRA',
    //         p_estado: true,
    //         p_detalles: [
    //             {
    //                 cuenta_id: 1,
    //                 debe: 15000,
    //                 haber: 0
    //             },
    //             {
    //                 cuenta_id: 5,
    //                 debe: 0,
    //                 haber: 15000
    //             }
    //         ]
    //     }
    // );
}