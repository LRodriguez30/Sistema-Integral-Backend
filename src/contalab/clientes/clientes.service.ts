import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateClientesDTO } from './dtos/create-clientes.dto';
import { UpdateClientesDTO } from './dtos/update-clientes.dto';
import { PedidosService } from '../pedidos/pedidos.service';
import { FacturasService } from '../facturas/facturas.service';
import { CobrosService } from '../cobros/cobros.service';

@Injectable()
export class ClientesService {
    private readonly supabaseClient: SupabaseClient;

    constructor(

        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => PedidosService))
        private readonly pedidosService: PedidosService,

        @Inject(forwardRef(() => FacturasService))
        private readonly facturasService: FacturasService,
        
        @Inject(forwardRef(() => CobrosService))
        private readonly cobrosService: CobrosService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('clientes')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los clientes de la BD...");
        }

        return data;
    }

    async getById(clienteId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('clientes')
            .select('*')
            .eq('cliente_id', clienteId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cliente de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al cliente con id '${clienteId}'...`);
        }

        return data;
    }

    async create(dto: CreateClientesDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('clientes')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el cliente en la BD...");
        }

        return data;
    }

    async update(clienteId: number, dto: UpdateClientesDTO) {
        const clienteEnBD = await this.getById(clienteId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('clientes')
            .update(dto)
            .eq('cliente_id', clienteId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el cliente con id '${clienteId}' en la BD...`);
        }

        return data;
    }

    async deleteById(clienteId: number) {
        const clienteEnBD = await this.getById(clienteId);

        try {
            await this.pedidosService.getByClienteId(clienteId);

            throw new ConflictException(
                `No se puede eliminar el cliente porque tiene pedidos asociados...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.facturasService.getByClienteId(clienteId);

            throw new ConflictException(
                `No se puede eliminar el cliente porque tiene facturas asociadas...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.cobrosService.getByClienteId(clienteId);

            throw new ConflictException(
                `No se puede eliminar el cliente porque tiene cobros asociados...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('clientes')
            .delete()
            .eq('cliente_id', clienteId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el cliente'
            );
        }

        const message = {
            "message": "Cliente eliminado correctamente..."
        }

        return message;
    }
}