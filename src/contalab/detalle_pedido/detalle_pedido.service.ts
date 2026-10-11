import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { PedidosService } from '../pedidos/pedidos.service';
import { ProductosService } from '../productos/productos.service';
import { CreateDetallePedidoDTO } from './dtos/create-detalle_pedido.dto';
import { UpdateDetallePedidoDTO } from './dtos/update-detalle_pedido.dto';

@Injectable()
export class DetallePedidoService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => PedidosService))
        private readonly pedidosService: PedidosService,

        @Inject(forwardRef(() => ProductosService))
        private readonly productosService: ProductosService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
            .select('*')
            .eq('detalle_pedido_id', detalleId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleId}'...`);
        }

        return data;
    }

    async getByPedidoId(pedidoId: number) {
        const pedidoEnBD = await this.pedidosService.getById(pedidoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
            .select('*')
            .eq('pedido_id', pedidoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al detalle con id de pedido '${pedidoId}'...`);
        }

        return data;
    }

    async getByProductoId(productoId: number) {
        const productoEnBD = await this.productosService.getById(productoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
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

    async create(dto: CreateDetallePedidoDTO) {
        const pedidoEnBD = await this.pedidosService.getById(dto.pedido_id);

        const subtotal = dto.cantidad * dto.precio_unitario;

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
            .insert({
                ...dto,
                subtotal
            })
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se puede crear el detalle del pedido en la BD...'
            );
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetallePedidoDTO) {
        const detalleEnBD = await this.getById(detalleId);

        if (dto.producto_id !== undefined) {
            const categoriaEnBD = await this.productosService.getById(dto.producto_id);
        }

        const cantidad =
            dto.cantidad !== undefined
                ? dto.cantidad
                : detalleEnBD.cantidad;

        const precioUnitario =
            dto.precio_unitario !== undefined
                ? dto.precio_unitario
                : detalleEnBD.precio_unitario;

        const subtotal = cantidad * precioUnitario;

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pedido')
            .update({
                ...dto,
                subtotal
            })
            .eq('detalle_pedido_id', detalleId)
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
            .from('detalle_pedido')
            .delete()
            .eq('detalle_pedido_id', detalleId)
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