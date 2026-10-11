import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { UsersService } from '../../users/users.service';
import { CreateComprasDTO } from './dtos/create-compras.dto';
import { DetalleCompraService } from '../detalle_compra/detalle_compra.service';
import { DetallePagoProveedorService } from '../detalle_pago_proveedor/detalle_pago_proveedor.service';

@Injectable()
export class ComprasService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => ProveedoresService))
        private readonly proveedoresService: ProveedoresService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => DetalleCompraService))
        private readonly detalleCompraService: DetalleCompraService,

        @Inject(forwardRef(() => DetallePagoProveedorService))
        private readonly detallePagoProveedorService: DetallePagoProveedorService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener las compras de la BD...");
        }

        return data;
    }

    async getById(compraId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .select('*')
            .eq('compra_id', compraId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la compra de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la compra con id '${compraId}'...`);
        }

        return data;
    }

    async getByProveedorId(proveedorId: number) {
        const proveedorEnBD = await this.proveedoresService.getById(proveedorId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .select('*')
            .eq('proveedor_id', proveedorId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la compra de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la compra con id de proveedor '${proveedorId}'...`);
        }

        return data;
    }

    async getByUserId(userId: number) {
        const userEnBD = await this.usersService.findById(userId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .select('*')
            .eq('usuario_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la compra de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la compra con id de user '${userId}'...`);
        }

        return data;
    }

    async create(dto: CreateComprasDTO) {
        const proveedorEnBD = await this.proveedoresService.getById(dto.proveedor_id);
        
        if (dto.usuario_id !== undefined) {
            const usuarioEnBD = await this.usersService.findById(dto.usuario_id);
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear la compra en la BD...");
        }

        return data;
    }

    async deleteById(compraId: number) {
        await this.getById(compraId);

        try {
            await this.detalleCompraService.getByCompraId(compraId);

            throw new ConflictException(
                'No se puede eliminar la compra porque tiene detalles de compra asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.detallePagoProveedorService.getByCompraId(compraId);

            throw new ConflictException(
                'No se puede eliminar la compra porque tiene detalles de pago asociados...'
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { error } = await this.supabaseClient
            .schema('contalab')
            .from('compras')
            .delete()
            .eq('compra_id', compraId);

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar la compra...'
            );
        }

        return {
            message: 'Compra eliminada correctamente...'
        };
    }
}