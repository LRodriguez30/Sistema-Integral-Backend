import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateCategoriaProductosDTO } from './dtos/create-categoria_productos.dto';
import { UpdateCategoriaProductosDTO } from './dtos/update-categoria_productos.dto';

@Injectable()
export class CategoriaProductosService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('categoria_productos')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener las categorias de la BD...");
        }

        return data;
    }

    async getById(categoriaId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('categoria_productos')
            .select('*')
            .eq('categoria_id', categoriaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener la categoría de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró la categoría con id '${categoriaId}'...`);
        }

        return data;
    }

    async create(dto: CreateCategoriaProductosDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('categoria_productos')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear la categoría en la BD...");
        }

        return data;
    }

    async update(categoriaId: number, dto: UpdateCategoriaProductosDTO) {
        const categoriaEnBD = await this.getById(categoriaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('categoria_productos')
            .update(dto)
            .eq('categoria_id', categoriaId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el categoría con id '${categoriaId}' en la BD...`);
        }

        return data;
    }

    async deleteById(categoriaId: number) {
        await this.getById(categoriaId);

        const { error } =
            await this.supabaseClient
                .schema('contalab')
                .rpc('delete_categoria_producto', {
                    p_categoria_id: categoriaId
                });

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar la categoría'
            );
        }

        return {
            message: 'Categoría eliminado correctamente'
        };
    }
}