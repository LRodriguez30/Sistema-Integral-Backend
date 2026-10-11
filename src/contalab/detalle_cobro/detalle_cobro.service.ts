import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CobrosService } from '../cobros/cobros.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { FacturasService } from '../facturas/facturas.service';
import { CreateDetalleCobroDTO } from './dtos/create-detalle_cobro.dto';
import { UpdateDetalleCobroDTO } from './dtos/update-detalle_cobro.dto';

@Injectable()
export class DetalleCobroService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => CobrosService))
        private readonly cobrosService: CobrosService,

        @Inject(forwardRef(() => FacturasService))
        private readonly facturasService: FacturasService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .select('*')
            .eq('detalle_cobro_id', detalleId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleId}'...`);
        }

        return data;
    }

    async getByCobroId(cobroId: number) {
        const cobroEnBD = await this.cobrosService.getById(cobroId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .select('*')
            .eq('cobro_id', cobroId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id de cobro '${cobroId}'...`);
        }

        return data;
    }

    async getByFacturaId(facturaId: number) {
        const facturaEnBD = await this.facturasService.getById(facturaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .select('*')
            .eq('factura_id', facturaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cobro de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el cobro con id de factura '${facturaId}'...`);
        }

        return data;
    }

    async create(dto: CreateDetalleCobroDTO) {
        const cobroEnBD = await this.cobrosService.getById(dto.cobro_id);
        const facturaEnBD = await this.facturasService.getById(dto.factura_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el detalle en la BD...");
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetalleCobroDTO) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .update(dto)
            .eq('detalle_cobro_id', detalleId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                `No se puede actualizar el detalle con id '${detalleId}'...`
            );
        }

        return data;
    }

    async deleteById(detalleId: number) {
        await this.getById(detalleId);

        const { error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_cobro')
            .delete()
            .eq('detalle_cobro_id', detalleId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el detalle del cobro...'
            );
        }

        return {
            message: 'Detalle del cobro eliminado correctamente...'
        };
    }
}