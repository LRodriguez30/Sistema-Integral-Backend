import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetalleNominaService } from './detalle_nomina.service';
import { plainToInstance } from 'class-transformer';
import { DetalleNominaResponseDTO } from './dtos/detalle_nomina-response.dto';
import { CreateDetalleNominaDTO } from './dtos/create-detalle_nomina.dto';

@Controller('detalle-nomina')
export class DetalleNominaController {
    constructor(
        private readonly detalleNominaService: DetalleNominaService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
            DetalleNominaResponseDTO,
            await this.detalleNominaService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY DETALLE ID
    @Get(':detalleNominaId')
    async ObtenerEmpleadoPorId(
        @Param('detalleNominaId', ParseIntPipe) detalleNominaId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetalleNominaResponseDTO,
            await this.detalleNominaService.getById(detalleNominaId),
            {
                groups: []
            }
        );
    }

    // GET BY NOMINA ID
    @Get('nomina/:nominaId')
    async ObtenerDetallePorNominaId(
        @Param('nominaId', ParseIntPipe) nominaId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetalleNominaResponseDTO,
            await this.detalleNominaService.getByNominaId(nominaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body() dto: CreateDetalleNominaDTO[],
        @Req() req
    ) {
        return plainToInstance(
            DetalleNominaResponseDTO,
            await this.detalleNominaService.create(dto),
            {
                groups: []
            }
        );
    }
}