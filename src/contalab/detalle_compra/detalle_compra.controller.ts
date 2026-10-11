import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetalleCompraService } from './detalle_compra.service';
import { plainToInstance } from 'class-transformer';
import { DetalleCompraResponseDTO } from './dtos/detalle_compra-response.dto';
import { CreateDetalleCompraDTO } from './dtos/create-detalle_compra.dto';
import { UpdateDetalleCompraDTO } from './dtos/update-detalle_compra.dto';

@Controller('detalle-compra')
export class DetalleCompraController {
    constructor(
        private readonly detalleCompraService: DetalleCompraService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
                DetalleCompraResponseDTO,
            await this.detalleCompraService.getAll(),
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
                DetalleCompraResponseDTO,
            await this.detalleCompraService.getById(detalleId),
            {
                groups: []
            }
        );
    }

    // GET BY COMPRA ID
    @Get('compra/:compraId')
    async ObtenerDetallePorcompraId(
        @Param('compraId', ParseIntPipe) compraId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCompraResponseDTO,
            await this.detalleCompraService.getByCompraId(compraId),
            {
                groups: []
            }
        );
    }

    // GET BY PRODUCTO ID
    @Get('producto/:productoId')
    async ObtenerDetallePorproductoId(
        @Param('productoId', ParseIntPipe) productoId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCompraResponseDTO,
            await this.detalleCompraService.getByProductoId(productoId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body () dto: CreateDetalleCompraDTO,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCompraResponseDTO,
            await this.detalleCompraService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY DETALLE ID
    @Patch(':detalleId')
    async ActualizarDetallePorId(
        @Body() dto: UpdateDetalleCompraDTO,
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
                DetalleCompraResponseDTO,
            await this.detalleCompraService.update(detalleId, dto),
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
        return await this.detalleCompraService.deleteById(detalleId);
    }
}