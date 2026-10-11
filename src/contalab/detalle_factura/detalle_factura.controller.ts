import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { plainToInstance } from 'class-transformer';
import { DetalleFacturaResponseDTO } from './dtos/detalle_factura-response.dto';
import { CreateDetalleFacturaDTO } from './dtos/create-detalle_factura.dto';
import { UpdateDetalleFacturaDTO } from './dtos/update-detalle_factura.dto';

@Controller('detalle-factura')
export class DetalleFacturaController {
    constructor(
        private readonly detalleFacturaService: DetalleFacturaService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.getAll(),
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
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.getById(detalleId),
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
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.getByFacturaId(facturaId),
            {
                groups: []
            }
        );
    }

    // GET BY PRODUCTO ID
    @Get('producto/:productoId')
    async ObtenerDetallePorProductoId(
        @Param('productoId', ParseIntPipe) productoId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.getByProductoId(productoId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body () dto: CreateDetalleFacturaDTO,
        @Req() req
    ) {
        return plainToInstance(
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY DETALLE ID
    @Patch(':detalleId')
    async ActualizarDetallePorId(
        @Body() dto: UpdateDetalleFacturaDTO,
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleFacturaResponseDTO,
            await this.detalleFacturaService.update(detalleId, dto),
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
        return await this.detalleFacturaService.deleteById(detalleId);
    }
}