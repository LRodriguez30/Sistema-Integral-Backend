import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { PagosProveedoresService } from '../pagos_proveedores/pagos_proveedores.service';
import { ComprasService } from '../compras/compras.service';
import { CreateDetallePagoProveedorDTO } from './dtos/create-detalle_pago_proveedor.dto';
import { UpdateDetallePagoProveedorDTO } from './dtos/update-detalle_pago_proveedor.dto';

@Injectable()
export class DetallePagoProveedorService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => PagosProveedoresService))
        private readonly pagosProveedoresService: PagosProveedoresService,

        @Inject(forwardRef(() => ComprasService))
        private readonly comprasService: ComprasService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de la BD...");
        }

        return data;
    }

    async getById(detalleId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .select('*')
            .eq('detalle_pago_id', detalleId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleId}'...`);
        }

        return data;
    }

    async getByPagoId(pagoId: number) {
        const pagoEnBD = await this.pagosProveedoresService.getById(pagoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .select('*')
            .eq('pago_id', pagoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al detalle con id de pago '${pagoId}'...`);
        }

        return data;
    }

    async getByCompraId(compraId: number) {
        const compraEnBD = await this.comprasService.getById(compraId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .select('*')
            .eq('compra_id', compraId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al detalle con id de compra '${compraId}'...`);
        }

        return data;
    }

    async create(dto: CreateDetallePagoProveedorDTO) {
        const pagoEnBD = await this.pagosProveedoresService.getById(dto.pago_id);
        const compraEnBD = await this.comprasService.getById(dto.compra_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .insert(dto)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se puede crear el detalle del pago en la BD...'
            );
        }

        return data;
    }

    async update(detalleId: number, dto: UpdateDetallePagoProveedorDTO) {
        const detalleEnBD = await this.getById(detalleId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_pago_proveedor')
            .update(dto)
            .eq('detalle_pago_id', detalleId)
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
            .from('detalle_pago_proveedor')
            .delete()
            .eq('detalle_pago_id', detalleId)
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