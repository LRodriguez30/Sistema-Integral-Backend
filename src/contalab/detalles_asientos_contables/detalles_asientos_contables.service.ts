import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateDetallesAsientosContablesDTO } from './dtos/create-detalles_asientos_contables.dto';
import { CatalogoCuentasService } from '../catalogo_cuentas/catalogo_cuentas.service';
import { AsientosContablesService } from '../asientos_contables/asientos_contables.service';
import { UpdateDetallesAsientosContablesDTO } from './dtos/update-asientos_contables.dto';
import { plantillaDetallesAsientos } from './data/plantilla-detalles_asientos_contables.data';

@Injectable()
export class DetallesAsientosContablesService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => CatalogoCuentasService))
        private readonly catalogoCuentasService: CatalogoCuentasService,

        @Inject(forwardRef(() => AsientosContablesService))
        private readonly asientosContablesService: AsientosContablesService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .select('*')
            .eq('detalle_id', detalleId)
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró un detalle con id ${detalleId}...`);
        }

        return data;
    }

    async getByAsientoId(asientoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .select('*')
            .eq('asiento_id', asientoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede encontrar el detalle en BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id de asiento ${asientoId}...`);
        }

        return data;
    }

    async getByCuentaId(cuentaId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .select('*')
            .eq('cuenta_id', cuentaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede encontrar el detalle en BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id de cuenta ${cuentaId}...`);
        }

        return data;
    }

    async create(dto: CreateDetallesAsientosContablesDTO) {
        try {
            const cuentaEnBD = await this.catalogoCuentasService.getById(dto.cuenta_id);
        } catch (error: any) {
            throw new NotFoundException(`${error.message} | Se requiere de una cuenta existente en el catálogo para su trazabilidad`);
        }

        try {
            const asientoEnBD = await this.asientosContablesService.getById(dto.asiento_id);
            
        } catch (error: any) {
            throw new NotFoundException(`${error.message} | Se requiere de un asiento existente para su trazabilidad`);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el detalle en BD...");
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetallesAsientosContablesDTO) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .update(dto)
            .eq('detalle_id', detalleId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede actualizar el detalle en BD...");
        }

        return data;
    }

    async deleteRecords() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .delete()
            .neq('detalle_id', 0)
        
        if (error) {
            throw new InternalServerErrorException("No se pueden borrar los registros en BD...")
        }

        const { error: rpc_error } = await this.supabaseClient
            .schema('contalab')
            .rpc('reset_detalles_asientos_contables_sequence');

        if (rpc_error) {
            throw new InternalServerErrorException(
                'No se pudo reiniciar la secuencia de los detalles.'
            );
        }

        const message = {
            "message": "Registros eliminados correctamente..."
        }

        return message;
    }

    async deleteDetalleById(detalleId: number) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalles_asientos_contables')
            .delete()
            .eq('detalle_id', detalleId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el detalle'
            );
        }

        const message = {
            "message": "Detalle eliminado correctamente..."
        }

        return message;
    }
}
