import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { ClientesService } from '../clientes/clientes.service';
import { UsersService } from '../../users/users.service';
import { PedidosService } from '../pedidos/pedidos.service';
import { CreateFacturasDTO } from './dtos/create-facturas.dto';
import { DetalleFacturaService } from '../detalle_factura/detalle_factura.service';
import { DetalleCobroService } from '../detalle_cobro/detalle_cobro.service';

@Injectable()
export class FacturasService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ClientesService))
        private readonly clientesService: ClientesService,

        @Inject(forwardRef(() => PedidosService))
        private readonly pedidosService: PedidosService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => DetalleFacturaService))
        private readonly detalleFacturaService: DetalleFacturaService,

        @Inject(forwardRef(() => DetalleCobroService))
        private readonly detalleCobroService: DetalleCobroService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener las facturas de la BD...");
        }

        return data;
    }

    async getById(facturaId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .select('*')
            .eq('factura_id', facturaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la factura de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la factura con id '${facturaId}'...`);
        }

        return data;
    }

    async getByClienteId(clienteId: number) {
        const clienteEnBD = await this.clientesService.getById(clienteId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .select('*')
            .eq('cliente_id', clienteId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la factura de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la factura con id de cliente '${clienteId}'...`);
        }

        return data;
    }

    async getByPedidoId(pedidoId: number) {
        const pedidoEnBD = await this.pedidosService.getById(pedidoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .select('*')
            .eq('pedido_id', pedidoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la factura de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la factura con id de pedido '${pedidoId}'...`);
        }

        return data;
    }

    async getByUserId(userId: number) {
        const userEnBD = await this.usersService.findById(userId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la factura de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la factura con id de user '${userId}'...`);
        }

        return data;
    }

    async create(dto: CreateFacturasDTO) {
        const clienteEnBD = await this.clientesService.getById(dto.cliente_id);
        const pedidoEnBD = await this.pedidosService.getById(dto.pedido_id);

        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear la factura en la BD...");
        }

        return data;
    }

    async deleteById(facturaId: number) {
        await this.getById(facturaId);

        try {
            await this.detalleFacturaService.getByFacturaId(facturaId);

            throw new ConflictException(
                'No se puede eliminar la factura porque tiene detalles de factura asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }
    
        try {
            await this.detalleCobroService.getByFacturaId(facturaId);

            throw new ConflictException(
                'No se puede eliminar la factura porque tiene detalles de cobro asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { error } = await this.supabaseClient
            .schema('contalab')
            .from('facturas')
            .delete()
            .eq('factura_id', facturaId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el factura...'
            );
        }

        return {
            message: 'Factura eliminado correctamente...'
        };
    }
}