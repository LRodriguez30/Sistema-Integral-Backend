import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreateSqlServerPersonasDTO } from './dtos/create-sqlserver-personas.dto';
import { UpdateSqlServerPersonasDTO } from './dtos/update-sqlserver-personas.dto';
import { plainToInstance } from 'class-transformer';
import { PersonasResponseDTO } from './dtos/personas-response.dto';
import { CreatePersonasDTO } from './dtos/create-personas.dto';
import { UpdatePersonasDTO } from './dtos/update-personas.dto';

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



    // ----------
    // GET      *
    // ----------

    // personas/
    @Get('')
    async getAllPersonas(@Req() req) {
        console.log("Información de personas solicitada...");
        // const userAccess = req.user.role;

        return plainToInstance(
            PersonasResponseDTO,
            await this.personasService.findAll(),
            {
                groups: [/* userAccess */]
            }
        );
    }

    // personas/:id
    @Get(':id')
    async getPersonaById(
        @Param('id', ParseUUIDPipe) personaId: string,
        @Req() req
    ) {
        console.log("Información de una persona en particular solicitada...");
        // const userAccess = req.user.role;

        return plainToInstance(
            PersonasResponseDTO,
            await this.personasService.findById(personaId),
            {
                groups: [/* userAccess */]
            }
        );
    }


    // ----------
    // POST     *
    // ----------

    // personas/
    @Post('')
    async createPersona(
        @Body() dto: CreatePersonasDTO,
        @Req() req
    ) {
        console.log("Creando persona en BD...");
        // const userAccess = req.user.role;

        return plainToInstance(
            PersonasResponseDTO,
            await this.personasService.create(dto),
            {
                groups: [/* userAccess */]
            }
        );
    }


    // ----------
    // PATCH    *
    // ----------
    
    // personas/:id
    @Patch(':id')
    async updatePersonaById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req,
        @Body() dto: UpdatePersonasDTO
    ) {
        console.log("Actualizando persona con campos:", dto);
        const userAccess = req.user.role;

        return plainToInstance(
            PersonasResponseDTO,
            await this.personasService.updateById(id, dto),
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
    async deletePersonaById(@Param('id', ParseIntPipe) personaId: string) {
        console.log("Eliminando persona en BD...");
        return await this.personasService.deleteById(personaId);
    }
}
