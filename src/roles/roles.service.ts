import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerRolesDTO } from './dtos/create-sqlserver-roles.dto';
import { UpdateSqlServerRolesDTO } from './dtos/update-sqlserver-roles.dto';

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
}
