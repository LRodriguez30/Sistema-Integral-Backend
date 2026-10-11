import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { PagosProveedoresService } from '../pagos_proveedores/pagos_proveedores.service';
import { ComprasService } from '../compras/compras.service';
import { CreateProveedoresDTO } from './dtos/create-proveedores.dto';
import { UpdateProveedoresDTO } from './dtos/update-proveedores.dto';

@Injectable()
export class ProveedoresService {
    private readonly supabaseClient: SupabaseClient;

    constructor(

        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => PagosProveedoresService))
        private readonly pagosProveedoresService: PagosProveedoresService,

        @Inject(forwardRef(() => ComprasService))
        private readonly comprasService: ComprasService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('proveedores')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los proveedores de la BD...");
        }

        return data;
    }

    async getById(proveedorId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('proveedores')
            .select('*')
            .eq('proveedor_id', proveedorId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el proveedor de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al proveedor con id '${proveedorId}'...`);
        }

        return data;
    }

    async create(dto: CreateProveedoresDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('proveedores')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el proveedor en la BD...");
        }

        return data;
    }

    async update(proveedorId: number, dto: UpdateProveedoresDTO) {
        const proveedorEnBD = await this.getById(proveedorId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('proveedores')
            .update(dto)
            .eq('proveedor_id', proveedorId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el proveedor con id '${proveedorId}' en la BD...`);
        }

        return data;
    }

    async deleteById(proveedorId: number) {
        const proveedorEnBD = await this.getById(proveedorId);

        try {
            await this.pagosProveedoresService.getByProveedorId(proveedorId);

            throw new ConflictException(
                `No se puede eliminar el proveedor porque tiene pagos asociados...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        try {
            await this.comprasService.getByProveedorId(proveedorId);

            throw new ConflictException(
                `No se puede eliminar el proveedor porque tiene compras asociadas...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('proveedores')
            .delete()
            .eq('proveedor_id', proveedorId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el proveedor'
            );
        }

        const message = {
            "message": "Proveedor eliminado correctamente..."
        }

        return message;
    }
}