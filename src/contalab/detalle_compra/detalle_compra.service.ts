import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { ComprasService } from '../compras/compras.service';
import { ProductosService } from '../productos/productos.service';
import { CreateDetalleCompraDTO } from './dtos/create-detalle_compra.dto';
import { UpdateDetalleCompraDTO } from './dtos/update-detalle_compra.dto';

@Injectable()
export class DetalleCompraService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ComprasService))
        private readonly comprasService: ComprasService,

        @Inject(forwardRef(() => ProductosService))
        private readonly productosService: ProductosService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .select('*')
            .eq('detalle_compra_id', detalleId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleId}'...`);
        }

        return data;
    }

    async getByCompraId(compraId: number) {
        const compraEnBD = await this.comprasService.getById(compraId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .select('*')
            .eq('compra_id', compraId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id de compra '${compraId}'...`);
        }

        return data;
    }

    async getByProductoId(productoId: number) {
        const productoEnBD = await this.productosService.getById(productoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .select('*')
            .eq('producto_id', productoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cobro de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el cobro con id de producto '${productoId}'...`);
        }

        return data;
    }

    async create(dto: CreateDetalleCompraDTO) {
        const compraEnBD = await this.comprasService.getById(dto.compra_id);
        const productoEnBD = await this.productosService.getById(dto.producto_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el detalle en la BD...");
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetalleCompraDTO) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_compra')
            .update(dto)
            .eq('detalle_compra_id', detalleId)
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
            .from('detalle_compra')
            .delete()
            .eq('detalle_compra_id', detalleId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el detalle de la compra...'
            );
        }

        return {
            message: 'Detalle de la compra eliminado correctamente...'
        };
    }
}