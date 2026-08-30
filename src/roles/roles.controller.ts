import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { CreateSqlServerRolesDTO } from './dtos/create-sqlserver-roles.dto';
import { RolesService } from './roles.service';
import { UpdateSqlServerRolesDTO } from './dtos/update-sqlserver-roles.dto';
import { plainToInstance } from 'class-transformer';
import { RolesResponseDTO } from './dtos/roles-response.dto';
import { CreateRolesDTO } from './dtos/create-roles.dto';
import { UpdateRolesDTO } from './dtos/update-roles.dto';

@Controller('roles')
export class RolesController {

    constructor(
        private rolesService: RolesService
    ) { }

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




    // ----------
    // GET      *
    // ----------

    // roles/
    @Get('')
    async getAllRoles(@Req() req) {
        console.log("Información de roles solicitada...");
        // const userAccess = req.user.role;

        return plainToInstance(
            RolesResponseDTO,
            await this.rolesService.findAll(),
            {
                groups: [/* userAccess */]
            }
        );
    }

    // roles/:id
    @Get(':id')
    async getRolById(
        @Param('id', ParseUUIDPipe) rolId: string,
        @Req() req
    ) {
        console.log("Información de un rol en particular solicitada...");
        // const userAccess = req.user.role;

        return plainToInstance(
            RolesResponseDTO,
            await this.rolesService.findById(rolId),
            {
                groups: [/* userAccess */]
            }
        );
    }


    // ----------
    // POST     *
    // ----------

    // roles/
    @Post('')
    async createRol(
        @Body() dto: CreateRolesDTO,
        @Req() req
    ) {
        console.log("Creando rol en BD...");
        // const userAccess = req.user.role;

        return plainToInstance(
            RolesResponseDTO,
            await this.rolesService.create(dto),
            {
                groups: [/* userAccess */]
            }
        );
    }


    // ----------
    // PATCH    *
    // ----------

    // roles/:id
    @Patch(':id')
    async updateRolById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req,
        @Body() dto: UpdateRolesDTO
    ) {
        console.log("Actualizando rol con campos:", dto);
        const userAccess = req.user.role;

        return plainToInstance(
            RolesResponseDTO,
            await this.rolesService.updateById(id, dto),
            {
                groups: [userAccess]
            }
        )
    }


    // ----------
    // DELETE   *
    // ----------

    // personas/:id
    @Delete(':id')
    async deleteRolById(@Param('id', ParseIntPipe) rolId: string) {
        console.log("Eliminando persona en BD...");
        return await this.rolesService.deleteById(rolId);
    }
}
