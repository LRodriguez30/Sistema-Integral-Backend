import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CobrosService } from './cobros.service';
import { plainToInstance } from 'class-transformer';
import { CobrosResponseDTO } from './dtos/cobros-response.dto';
import { CreateCobrosDTO } from './dtos/create-cobros.dto';
import { UpdateCobrosDTO } from './dtos/update-cobros.dto';

@Controller('cobros')
export class CobrosController {
    constructor (
        private readonly cobrosService: CobrosService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerCobros(
        @Req() req
    ) {
        return plainToInstance(
                CobrosResponseDTO,
            await this.cobrosService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY COBRO ID
    @Get(':cobroId')
    async ObtenerCobroPorId(
        @Param('cobroId', ParseIntPipe) cobroId: number,
        @Req() req
    ) {
        return plainToInstance(
                CobrosResponseDTO,
            await this.cobrosService.getById(cobroId),
            {
                groups: []
            }
        );
    }

    // GET BY CLIENTE ID
    @Get('cliente/:clienteId')
    async ObtenerCobroPorClienteId(
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return plainToInstance(
                CobrosResponseDTO,
            await this.cobrosService.getByClienteId(clienteId),
            {
                groups: []
            }
        );
    }

    // GET BY USER ID
    @Get('user/:userId')
    async ObtenerCobroPoruserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
                CobrosResponseDTO,
            await this.cobrosService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearCobro(
        @Body () dto: CreateCobrosDTO,
        @Req() req
    ) {
        return plainToInstance(
                CobrosResponseDTO,
            await this.cobrosService.create(dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY COBRO ID
    @Delete(':cobroId')
    async EliminarCobroPorId(
        @Param('cobroId', ParseIntPipe) cobroId: number,
        @Req() req
    ) {
        return await this.cobrosService.deleteById(cobroId);
    }
}