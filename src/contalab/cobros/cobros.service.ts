import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { UsersService } from '../../users/users.service';
import { ClientesService } from '../clientes/clientes.service';
import { CreateCobrosDTO } from './dtos/create-cobros.dto';
import { DetalleCobroService } from '../detalle_cobro/detalle_cobro.service';

@Injectable()
export class CobrosService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ClientesService))
        private readonly clientesService: ClientesService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => DetalleCobroService))
        private readonly detalleCobroService: DetalleCobroService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los cobros de la BD...");
        }

        return data;
    }

    async getById(cobroId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .select('*')
            .eq('cobro_id', cobroId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cobro de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el cobro con id '${cobroId}'...`);
        }

        return data;
    }

    async getByClienteId(clienteId: number) {
        const clienteEnBD = await this.clientesService.getById(clienteId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .select('*')
            .eq('cliente_id', clienteId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cobro de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el cobro con id de cliente '${clienteId}'...`);
        }

        return data;
    }

    async getByUserId(userId: number) {
        const userEnBD = await this.usersService.findById(userId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el cobro de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el cobro con id de user '${userId}'...`);
        }

        return data;
    }

    async create(dto: CreateCobrosDTO) {
        const clienteEnBD = await this.clientesService.getById(dto.cliente_id);
        const usuarioEnBD = await this.usersService.findById(dto.usuario_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el cobro en la BD...");
        }

        return data;
    }

    async deleteById(cobroId: number) {
        await this.getById(cobroId);

        try {
            await this.detalleCobroService.getByCobroId(cobroId);

            throw new ConflictException(
                'No se puede eliminar el cobro porque tiene detalles asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { error } = await this.supabaseClient
            .schema('contalab')
            .from('cobros')
            .delete()
            .eq('cobro_id', cobroId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el cobro...'
            );
        }

        return {
            message: 'cobro eliminado correctamente...'
        };
    }
}