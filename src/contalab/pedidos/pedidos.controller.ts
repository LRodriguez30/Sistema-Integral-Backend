import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PedidosService } from './pedidos.service';
import { PedidosResponseDTO } from './dtos/pedidos-response.dto';
import { CreatePedidosDTO } from './dtos/create-pedidos.dto';
import { UpdatePedidosDTO } from './dtos/update-pedidos.dto';

@Controller('pedidos')
export class PedidosController {
    constructor(
        private readonly pedidosService: PedidosService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerPedidos(
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY PEDIDO ID
    @Get(':pedidoId')
    async ObtenerPedidoPorId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.getById(pedidoId),
            {
                groups: []
            }
        );
    }

    // GET BY CLIENTE ID
    @Get('cliente/:clienteId')
    async ObtenerPedidoPorClienteId(
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.getByClienteId(clienteId),
            {
                groups: []
            }
        );
    }

    // GET BY USUARIO ID
    @Get('user/:userId')
    async ObtenerPedidoPorUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearPedido(
        @Body() dto: CreatePedidosDTO,
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY PEDIDO ID
    @Patch(':pedidoId')
    async ActualizarPedidoPorId(
        @Body() dto: UpdatePedidosDTO,
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Req() req
    ) {
        return plainToInstance(
            PedidosResponseDTO,
            await this.pedidosService.update(pedidoId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY PEDIDO ID
    @Delete(':pedidoId')
    async EliminarEmpleadoPorId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Req() req
    ) {
        return await this.pedidosService.deleteById(pedidoId);
    }
}