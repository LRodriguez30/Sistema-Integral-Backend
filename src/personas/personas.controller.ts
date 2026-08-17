import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreateSqlServerPersonasDTO } from './dtos/create-sqlserver-personas.dto';
import { UpdateSqlServerPersonasDTO } from './dtos/update-sqlserver-personas.dto';

@Controller('personas')
export class PersonasController {
    constructor(
        private personasService: PersonasService
    ) { }

    // -----------------------------------------
    // GET
    // -----------------------------------------
    @Get('sqlServer')
    async getAllSqlServerPersonas(@Req() req) {
        console.log({
            server: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            passwordExists: !!process.env.DB_PASSWORD,
        });

        console.log("Solicitando información de SQL Server usando Prisma...");

        return await this.personasService.sqlServerFindAll();
    }


    // -----------------------------------------
    // POST
    // -----------------------------------------
    @Post('sqlServer')
    async createSqlServerPersona(
        @Body() dto: CreateSqlServerPersonasDTO
    ) {
        console.log("Creando persona en BD...");

        return await this.personasService.sqlServerCreate(dto);
    }


    // -----------------------------------------
    // PATCH
    // -----------------------------------------
    @Patch('sqlServer')
    async patchSqlServerPersona(
        @Body() dto: UpdateSqlServerPersonasDTO,
        @Param('PersonaId', ParseIntPipe) personaId: number
    ) {
        console.log("Actualizando persona en BD...");

        return await this.personasService.sqlServerUpdate(dto, personaId)
    }


    // -----------------------------------------
    // DELETE
    // -----------------------------------------
    @Delete('sqlServer')
    async deleteSqlServerPersona(
        @Param('PersonaId', ParseIntPipe) personaId: number
    ) {
        console.log("Eliminando persona de la BD...");

        return await this.personasService.sqlServerDelete(personaId);
    }
}
