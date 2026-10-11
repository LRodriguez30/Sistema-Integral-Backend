import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { UsersService } from '../../users/users.service';
import { CreatePagosProveedoresDTO } from './dtos/create-pagos_proveedores.dto';
import { UpdatePagosProveedoresDTO } from './dtos/update-pagos_proveedores.dto';

@Injectable()
export class PagosProveedoresService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ProveedoresService))
        private readonly proveedoresService: ProveedoresService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los pagos de la BD...");
        }

        return data;
    }

    async getById(pagoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .select('*')
            .eq('pago_id', pagoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pago de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pago con id '${pagoId}'...`);
        }

        return data;
    }

    async getByProveedorId(proveedorId: number) {
        const proveedorEnBD = await this.proveedoresService.getById(proveedorId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .select('*')
            .eq('proveedor_id', proveedorId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pago de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pago con id de proveedor '${proveedorId}'...`);
        }

        return data;
    }

    async getByUserId(userId: number) {
        const usuarioEnBD = await this.usersService.findById(userId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el pago de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el pago con id de usuario '${userId}'...`);
        }

        return data;
    }

    async create(dto: CreatePagosProveedoresDTO) {
        const proveedorEnBD = await this.proveedoresService.getById(dto.proveedor_id);

        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el pago en la BD...");
        }

        return data;
    }

    async update(pagoId: number, dto: UpdatePagosProveedoresDTO) {
        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('pagos_proveedores')
            .update(dto)
            .eq('pago_id', pagoId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el pago con id '${pagoId}' en la BD...`);
        }

        return data;
    }

    async deleteById(pagoId: number) {

        await this.getById(pagoId);

        const { error } =
            await this.supabaseClient
                .schema('contalab')
                .rpc('delete_pago_proveedores', {
                    p_pago_id: pagoId
                });

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el pago'
            );
        }

        return {
            message: 'pago eliminado correctamente'
        };
    }
}