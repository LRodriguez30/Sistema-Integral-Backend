import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { FacturasService } from '../facturas/facturas.service';
import { ProductosService } from '../productos/productos.service';
import { CreateDetalleFacturaDTO } from './dtos/create-detalle_factura.dto';
import { UpdateDetalleFacturaDTO } from './dtos/update-detalle_factura.dto';

@Injectable()
export class DetalleFacturaService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => FacturasService))
        private readonly facturasService: FacturasService,

        @Inject(forwardRef(() => ProductosService))
        private readonly productosService: ProductosService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .select('*')
            .eq('detalle_factura_id', detalleId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleId}'...`);
        }

        return data;
    }

    async getByFacturaId(facturaId: number) {
        const facturaEnBD = await this.facturasService.getById(facturaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .select('*')
            .eq('factura_id', facturaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al detalle con id de factura '${facturaId}'...`);
        }

        return data;
    }

    async getByProductoId(productoId: number) {
        const productoEnBD = await this.productosService.getById(productoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .select('*')
            .eq('producto_id', productoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al detalle con id de producto '${productoId}'...`);
        }

        return data;
    }

    async create(dto: CreateDetalleFacturaDTO) {
        const facturaEnBD = await this.facturasService.getById(dto.factura_id);
        const productoEnBD = await this.productosService.getById(dto.producto_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .insert(dto)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se puede crear el detalle de la factura en la BD...'
            );
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetalleFacturaDTO) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .update(dto)
            .eq('detalle_factura_id', detalleId)
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
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_factura')
            .delete()
            .eq('detalle_factura_id', detalleId)
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