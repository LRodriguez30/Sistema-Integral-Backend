import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CategoriaProductosService } from '../categoria_productos/categoria_productos.service';
import { CreateProductosDTO } from './dtos/create-productos.dto';
import { UpdateProductosDTO } from './dtos/update-productos.dto';
import { DetallePedidoService } from '../detalle_pedido/detalle_pedido.service';
import { DetalleFacturaService } from '../detalle_factura/detalle_factura.service';
import { DetalleCompraService } from '../detalle_compra/detalle_compra.service';

@Injectable()
export class ProductosService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => CategoriaProductosService))
        private readonly categoriaProductosService: CategoriaProductosService,

        @Inject(forwardRef(() => DetallePedidoService))
        private readonly detallePedidoService: DetallePedidoService,

        @Inject(forwardRef(() => DetalleFacturaService))
        private readonly detalleFacturaService: DetalleFacturaService,

        @Inject(forwardRef(() => DetalleCompraService))
        private readonly detalleCompraService: DetalleCompraService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los productos de la BD...");
        }

        return data;
    }

    async getById(productoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .select('*')
            .eq('producto_id', productoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el producto de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el producto con id '${productoId}'...`);
        }

        return data;
    }

    async getByCategoriaId(categoriaId: number) {
        const categoriaEnBD = await this.categoriaProductosService.getById(categoriaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .select('*')
            .eq('categoria_id', categoriaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el producto de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al producto con id de categoría '${categoriaId}'...`);
        }

        return data;
    }

    async create(dto: CreateProductosDTO) {
        const categoriaEnBD = await this.categoriaProductosService.getById(dto.categoria_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el producto en la BD...");
        }

        return data;
    }

    async update(productoId: number, dto: UpdateProductosDTO) {
        const productoEnBD = await this.getById(productoId);

        if (dto.categoria_id !== undefined) {
            const categoriaEnBD = await this.categoriaProductosService.getById(dto.categoria_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .update(dto)
            .eq('producto_id', productoId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el producto con id '${productoId}' en la BD...`);
        }

        return data;
    }

    async deleteById(productoId: number) {
        await this.getById(productoId);

        try {
            await this.detallePedidoService.getByProductoId(productoId);

            throw new ConflictException(
                'No se puede eliminar el producto porque tiene pedidos asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.detalleFacturaService.getByProductoId(productoId);

            throw new ConflictException(
                'No se puede eliminar el producto porque tiene facturas asociadas...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.detalleCompraService.getByProductoId(productoId);

            throw new ConflictException(
                'No se puede eliminar el producto porque tiene detalles de compra asociadas...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { error } = await this.supabaseClient
            .schema('contalab')
            .from('productos')
            .delete()
            .eq('producto_id', productoId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el producto...'
            );
        }

        return {
            message: 'Producto eliminado correctamente...'
        };
    }
}