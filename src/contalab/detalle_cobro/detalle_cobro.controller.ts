import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DetalleCobroResponseDTO } from './dtos/detalle_cobro-response.dto';
import { DetalleCobroService } from './detalle_cobro.service';
import { CreateDetalleCobroDTO } from './dtos/create-detalle_cobro.dto';
import { UpdateDetalleCobroDTO } from './dtos/update-detalle_cobro.dto';

@Controller('detalle-cobro')
export class DetalleCobroController {
    constructor(
        private readonly detalleCobroService: DetalleCobroService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY DETALLE ID
    @Get(':detalleId')
    async ObtenerDetallePorId(
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.getById(detalleId),
            {
                groups: []
            }
        );
    }

    // GET BY COBRO ID
    @Get('cobro/:cobroId')
    async ObtenerDetallePorCobroId(
        @Param('cobroId', ParseIntPipe) cobroId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.getByCobroId(cobroId),
            {
                groups: []
            }
        );
    }

    // GET BY FACTURA ID
    @Get('factura/:facturaId')
    async ObtenerDetallePorFacturaId(
        @Param('facturaId', ParseIntPipe) facturaId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.getByFacturaId(facturaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body () dto: CreateDetalleCobroDTO,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY DETALLE ID
    @Patch(':detalleId')
    async ActualizarDetallePorId(
        @Body() dto: UpdateDetalleCobroDTO,
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCobroResponseDTO,
            await this.detalleCobroService.update(detalleId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY DETALLE ID
    @Delete(':detalleId')
    async EliminardetallePorId(
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return await this.detalleCobroService.deleteById(detalleId);
    }
}