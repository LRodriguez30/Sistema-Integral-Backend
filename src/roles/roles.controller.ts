import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CreateSqlServerRolesDTO } from './dtos/create-sqlserver-roles.dto';
import { RolesService } from './roles.service';
import { UpdateSqlServerRolesDTO } from './dtos/update-sqlserver-roles.dto';

@Controller('roles')
export class RolesController {

    constructor(
        private rolesService: RolesService
    ) {}

    // -----------------------------------------
    // GET
    // -----------------------------------------
    @Get('sqlServer')
    async getAllSqlServerRoles(@Req() req) {
        console.log({
            server: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            passwordExists: !!process.env.DB_PASSWORD,
        });

        console.log("Solicitando información de SQL Server usando Prisma...");

        return await this.rolesService.sqlServerFindAll();
    }


    // -----------------------------------------
    // POST
    // -----------------------------------------
    @Post('sqlServer')
    async createSqlServerRol(
        @Body() dto: CreateSqlServerRolesDTO
    ) {
        console.log("Creando rol en BD...");

        return await this.rolesService.sqlServerCreate(dto);
    }


    // -----------------------------------------
    // PATCH
    // -----------------------------------------
    @Patch('sqlServer')
    async patchSqlServerRole(
        @Body() dto: UpdateSqlServerRolesDTO,
        @Param('RolId', ParseIntPipe) rolId: number
    ) {
        console.log("Actualizando rol en BD...");
        return this.rolesService.sqlServerUpdate(dto, rolId);
    }


    // -----------------------------------------
    // DELETE
    // -----------------------------------------
    @Delete('sqlServer')
    async deleteSqlServerRol(
        @Param('RolId', ParseIntPipe) rolId: number
    ) {
        console.log("Eliminado rol de la BD...");
        return this.rolesService.sqlServerDelete(rolId);
    }
}
