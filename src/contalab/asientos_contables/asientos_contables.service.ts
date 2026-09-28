import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateAsientosContablesDTO } from './dtos/create-asientos_contables.dto';
import { UpdateAsientosContablesDTO } from './dtos/update-asientos_contables.dto';
import { UsersService } from '../../users/users.service';
import { plantillaAsientosContables } from './data/plantilla-asientos_contables.data';
import { CreateFullAsientosContablesDTO } from './dtos/create-full-asientos_contables.dto';
import { plantillaFullAsientosContables } from './data/plantilla_full-asientos_contables.data';
import { DetallesAsientosContablesService } from '../detalles_asientos_contables/detalles_asientos_contables.service';

@Injectable()
export class AsientosContablesService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => DetallesAsientosContablesService))
        private readonly detallesAsientosContablesService: DetallesAsientosContablesService
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

    async getById(asientoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .select('*')
            .eq('asiento_id', asientoId)
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el asiento contable de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró un asiento contable con id ${asientoId}...`);
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
        try {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        } catch (error: any) {
            throw new NotFoundException(`${error.message} | Se requiere de un usuario existente para su trazabilidad`);
        }

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

    async createFull(dto: CreateFullAsientosContablesDTO) {

        const { data, error } = await this.supabaseClient.rpc(
            'crear_asiento_contable',
            {
                p_usuario_id: dto.asiento_contable.usuario_id,
                p_fecha: dto.asiento_contable.fecha,
                p_concepto: dto.asiento_contable.concepto,
                p_tipo_origen: dto.asiento_contable.tipo_origen,

                p_detalles: dto.detalles_asientos_contables
            }
        );

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo crear el asiento contable.'
            );
        }

        return data;
    }

    async update(asientoId: number, dto: UpdateAsientosContablesDTO) {
        const asientoContableEnBD = await this.getById(asientoId);

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

    async createBaseLayout() {
        const asientos = await this.getAll();

        if (asientos.length !== 0) {
            throw new ConflictException(
                'No se puede generar la plantilla base porque ya hay datos registrados.'
            );
        }

        const { error: rpc_error } = await this.supabaseClient
            .schema('contalab')
            .rpc('reset_asientos_contables_sequence');

        if (rpc_error) {
            throw new InternalServerErrorException(
                'No se pudo reiniciar la secuencia de los asientos contables.'
            );
        }

        const { data, error: cc_error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .upsert(plantillaAsientosContables, {
                onConflict: 'asiento_id'
            })
            .select()

        if (cc_error) {
            throw new InternalServerErrorException("No se puede crear el asiento en la BD...");
        }

        return data;
    }

    async createFullBaseLayout() {

        const asientos = await this.getAll();

        if (asientos.length !== 0) {
            throw new ConflictException(
                'No se puede generar la plantilla base completa porque ya hay datos registrados.'
            );
        }

        const detalles = await this.detallesAsientosContablesService.getAll();

        if (asientos.length !== 0) {
            throw new ConflictException(
                'No se puede generar la plantilla base completa porque los asientos ya tienen detalles.'
            );
        }

        const { error: rpc_error } = await this.supabaseClient
            .schema('contalab')
            .rpc('reset_asientos_contables_sequence');

        if (rpc_error) {
            throw new InternalServerErrorException(
                'No se pudo reiniciar la secuencia de los asientos contables.'
            );
        }

        const resultados: any = [];

        for (const plantilla of plantillaFullAsientosContables) {

            const { data, error } = await this.supabaseClient
                .schema('contalab')
                .rpc('crear_asiento_contable', {
                    p_usuario_id: plantilla.asiento_contable.usuario_id,
                    p_fecha: plantilla.asiento_contable.fecha,
                    p_concepto: plantilla.asiento_contable.concepto,
                    p_tipo_origen: plantilla.asiento_contable.tipo_origen,

                    p_detalles: plantilla.detalles_asientos_contables
                });

            if (error) {
                throw new InternalServerErrorException(
                    `No se pudo crear el asiento "${plantilla.asiento_contable.concepto}".`
                );
            }

            resultados.push(data);
        }

        return resultados;
    }

    async deleteRecords() {
        const detalles = await this.detallesAsientosContablesService.getAll();

        if (detalles.length !== 0) {
            throw new ConflictException(
                'No se pueden eliminar los asientos porque contienen detalles | ' +
                'Elimina primero los detalles para evitar dejar información sin trazabilidad.'
            );
        }
        
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .delete()
            .neq('asiento_id', 0)
        
        if (error) {
            throw new InternalServerErrorException("No se pueden borrar los registros en BD...")
        }

        const { error: rpc_error } = await this.supabaseClient
            .schema('contalab')
            .rpc('reset_asientos_contables_sequence');

        if (rpc_error) {
            throw new InternalServerErrorException(
                'No se pudo reiniciar la secuencia de los asientos contables.'
            );
        }

        const message = {
            "message": "Registros eliminados correctamente..."
        }

        return message;
    }

    async deleteAsientoById(asientoId: number) {
        const asientoEnBD = await this.getById(asientoId);

        try {

            const detallesEnAsiento = await this.detallesAsientosContablesService.getByAsientoId(asientoId);
    
            if (detallesEnAsiento) {
                throw new ConflictException(
                    'No se puede eliminar el asiento porque contiene detalles | ' +
                    'Elimina primero los detalles para evitar dejar información sin trazabilidad.'
                );
            }

        } catch (error) {}

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('asientos_contables')
            .delete()
            .eq('asiento_id', asientoId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el asiento.'
            );
        }

        const message = {
            "message": "Asiento eliminado correctamente..."
        }

        return message;
    }
}