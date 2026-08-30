import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerRolesDTO } from './dtos/create-sqlserver-roles.dto';
import { UpdateSqlServerRolesDTO } from './dtos/update-sqlserver-roles.dto';
import { CreateRolesDTO } from './dtos/create-roles.dto';
import { UpdateRolesDTO } from './dtos/update-roles.dto';

@Injectable()
export class RolesService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly prismaService: PrismaService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    // -----------------------------------------
    // READ
    // -----------------------------------------
    async sqlServerFindAll() {
        return this.prismaService.roles.findMany();
    }


    // -----------------------------------------
    // CREATE
    // -----------------------------------------
    async sqlServerCreate(dto: CreateSqlServerRolesDTO) {
        return this.prismaService.roles.create({
            data: {
                NombreRol: dto.nombreRol,
                Descripcion: dto.descripcion,
                Estado: dto.estado
            }
        });
    }


    // -----------------------------------------
    // UPDATE
    // -----------------------------------------
    async sqlServerUpdate(dto: UpdateSqlServerRolesDTO, rolId: number) {
        const data: any = {}

        if (dto.nombreRol !== undefined) {
            data.NombreRol = dto.nombreRol;
        }

        if (dto.descripcion !== undefined) {
            data.Descripcion = dto.descripcion;
        }

        if (dto.estado !== undefined) {
            data.Estado = dto.estado;
        }

        return this.prismaService.roles.update({
            where: {
                RolId: rolId
            },
            data
        })
    }


    // -----------------------------------------
    // DELETE
    // -----------------------------------------
    async sqlServerDelete(rolId: number) {
        return this.prismaService.roles.delete({
            where: {
                RolId: rolId
            }
        })
    }




    async findAll() {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('roles')
            .select('*')

        if (error) {
        console.error(error);

        throw new InternalServerErrorException(
            'No se pueden obtener roles de la BD...'
        );
    }

        return data;
    }

    async findById(rolId: string) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('roles')
            .select('*')
            .eq('rol_id', rolId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('No se pueden obtener rol de la BD...')
        }

        if (!data) {
            throw new NotFoundException(`Rol con id '${rolId}' no encontrado...`);
        }

        return data;
    }

    async create(dto: CreateRolesDTO) {

        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('roles')
            .insert({
                nombre_rol: dto.nombre_rol,
                descripcion: dto.descripcion,
                estado: dto.estado
            })
            .select()
            .single()

        if (error) {
            console.log(error)
        }

        return data;
    }

    async updateById(rolId: string, dto: UpdateRolesDTO) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('roles')
            .update(dto)
            .eq('rol_id', rolId)
            .select()
            .maybeSingle();

        if (error) {
            throw new InternalServerErrorException("No se puede actualizar el rol...");
        }

        if (!data) {
            throw new NotFoundException(`Persona con id '${rolId}' no encontrada...`);
        }

        return data;
    }

    async deleteById(rol_id: string) {
        await this.findById(rol_id);

        const { error } = await this.supabaseClient
            .schema('core')
            .from('roles')
            .delete()
            .eq('rol_id', rol_id)
            .single()

        if (error) {
            throw new InternalServerErrorException('No se puede borrar el rol de la BD...');
        }

        const message = {
            "message": "Rol eliminado correctamente..."
        }

        return message;
    }
}
