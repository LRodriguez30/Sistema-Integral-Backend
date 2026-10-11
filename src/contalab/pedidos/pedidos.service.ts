import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { ClientesService } from '../clientes/clientes.service';
import { UsersService } from '../../users/users.service';
import { CreatePedidosDTO } from './dtos/create-pedidos.dto';
import { UpdatePedidosDTO } from './dtos/update-pedidos.dto';

@Injectable()
export class PedidosService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ClientesService))
        private readonly clientesService: ClientesService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los pedidos de la BD...");
        }

        return data;
    }

    async getById(pedidoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .select('*')
            .eq('pedido_id', pedidoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pedido de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pedido con id '${pedidoId}'...`);
        }

        return data;
    }

    async getByClienteId(clienteId: number) {
        const clienteEnBD = await this.clientesService.getById(clienteId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .select('*')
            .eq('cliente_id', clienteId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pedido de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pedido con id de cliente '${clienteId}'...`);
        }

        return data;
    }

    async getByUserId(userId: number) {
        const usuarioEnBD = await this.usersService.findById(userId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pedido de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pedido con id de usuario '${userId}'...`);
        }

        return data;
    }

    async create(dto: CreatePedidosDTO) {
        const clienteEnBD = await this.clientesService.getById(dto.cliente_id);

        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el pedido en la BD...");
        }

        return data;
    }

    async update(pedidoId: number, dto: UpdatePedidosDTO) {
        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pedidos')
            .update(dto)
            .eq('pedido_id', pedidoId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el pedido con id '${pedidoId}' en la BD...`);
        }

        return data;
    }

    async deleteById(pedidoId: number) {

        await this.getById(pedidoId);

        const { error } =
            await this.supabaseClient
                .schema('contalab')
                .rpc('delete_pedido', {
                    p_pedido_id: pedidoId
                });

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el pedido'
            );
        }

        return {
            message: 'Pedido eliminado correctamente'
        };
    }
}