import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { plainToInstance } from 'class-transformer';
import { NominaResponseDTO } from './dtos/nomina-response.dto';
import { CreateNominaDTO } from './dtos/create-nomina.dto';
import { UpdateNominaDTO } from './dtos/update-nomina.dto';

@Controller('nomina')
export class NominaController {
    constructor(
        private readonly nominaService: NominaService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerNominas(
        @Req() req
    ) {
        return plainToInstance(
            NominaResponseDTO,
            await this.nominaService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY NOMINA ID
    @Get(':nominaId')
    async ObtenerNominaPorId(
        @Param('nominaId', ParseIntPipe) nominaId: number,
        @Req() req
    ) {
        return plainToInstance(
            NominaResponseDTO,
            await this.nominaService.getById(nominaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearNomina(
        @Body() dto: CreateNominaDTO,
        @Req() req
    ) {
        return plainToInstance(
            NominaResponseDTO,
            await this.nominaService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY NOMINA ID
    @Patch(':nominaId')
    async ActualizarNominaPorId(
        @Body() dto: UpdateNominaDTO,
        @Param('nominaId', ParseIntPipe) nominaId: number,
        @Req() req
    ) {
        return plainToInstance(
            NominaResponseDTO,
            await this.nominaService.update(nominaId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY NOMINA ID
    @Delete(':nominaId')
    async EliminarNominaPorId(
        @Param('nominaId', ParseIntPipe) nominaId: number,
        @Req() req
    ) {
        return await this.nominaService.deleteById(nominaId);
    }
}