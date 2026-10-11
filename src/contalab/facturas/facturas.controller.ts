import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { plainToInstance } from 'class-transformer';
import { FacturasResponseDTO } from './dtos/facturas-response.dto';
import { CreateFacturasDTO } from './dtos/create-facturas.dto';

@Controller('facturas')
export class FacturasController {
    constructor(
        private readonly facturasService: FacturasService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerFacturas(
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY FACTURA ID
    @Get(':facturaId')
    async ObtenerFacturaPorId(
        @Param('facturaId', ParseIntPipe) facturaId: number,
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.getById(facturaId),
            {
                groups: []
            }
        );
    }

    // GET BY CLIENTE ID
    @Get('cliente/:clienteId')
    async ObtenerfacturaPorClienteId(
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.getByClienteId(clienteId),
            {
                groups: []
            }
        );
    }

    // GET BY PEDIDO ID
    @Get('pedido/:pedidoId')
    async ObtenerFacturaPorPedidoId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.getByPedidoId(pedidoId),
            {
                groups: []
            }
        );
    }

    // GET BY USER ID
    @Get('user/:userId')
    async ObtenerFacturaPorUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearFactura(
        @Body() dto: CreateFacturasDTO,
        @Req() req
    ) {
        return plainToInstance(
            FacturasResponseDTO,
            await this.facturasService.create(dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY FACTURA ID
    @Delete(':facturaId')
    async EliminarfacturaPorId(
        @Param('facturaId', ParseIntPipe) facturaId: number,
        @Req() req
    ) {
        return await this.facturasService.deleteById(facturaId);
    }
}