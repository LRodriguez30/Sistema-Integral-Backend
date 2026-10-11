import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { plainToInstance } from 'class-transformer';
import { DetallePedidoResponseDTO } from './dtos/detalle_pedido-response.dto';
import { CreateDetallePedidoDTO } from './dtos/create-detalle_pedido.dto';
import { UpdateDetallePedidoDTO } from './dtos/update-detalle_pedido.dto';

@Controller('detalle-pedido')
export class DetallePedidoController {
    constructor(
        private readonly detallePedidoService: DetallePedidoService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
            DetallePedidoResponseDTO,
            await this.detallePedidoService.getAll(),
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
            DetallePedidoResponseDTO,
            await this.detallePedidoService.getById(detalleId),
            {
                groups: []
            }
        );
    }

    // GET BY PEDIDO ID
    @Get('pedido/:pedidoId')
    async ObtenerDetallePorPedidoId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallePedidoResponseDTO,
            await this.detallePedidoService.getByPedidoId(pedidoId),
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
            DetallePedidoResponseDTO,
            await this.detallePedidoService.getByProductoId(productoId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body() dto: CreateDetallePedidoDTO,
        @Req() req
    ) {
        return plainToInstance(
            DetallePedidoResponseDTO,
            await this.detallePedidoService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY DETALLE ID
    @Patch(':detalleId')
    async ActualizarDetallePorId(
        @Body() dto: UpdateDetallePedidoDTO,
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallePedidoResponseDTO,
            await this.detallePedidoService.update(detalleId, dto),
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
        return await this.detallePedidoService.deleteById(detalleId);
    }
}