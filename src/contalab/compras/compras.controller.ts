import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasResponseDTO } from './dtos/compras-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateComprasDTO } from './dtos/create-compras.dto';

@Controller('compras')
export class ComprasController {
    constructor (
        private readonly comprasService: ComprasService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerCompras(
        @Req() req
    ) {
        return plainToInstance(
                ComprasResponseDTO,
            await this.comprasService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY COMPRA ID
    @Get(':compraId')
    async ObtenerCompraPorId(
        @Param('compraId', ParseIntPipe) compraId: number,
        @Req() req
    ) {
        return plainToInstance(
                ComprasResponseDTO,
            await this.comprasService.getById(compraId),
            {
                groups: []
            }
        );
    }

    // GET BY PROVEEDOR ID
    @Get('proveedor/:proveedorId')
    async ObtenerCompraPorProveedorId(
        @Param('proveedorId', ParseIntPipe) proveedorId: number,
        @Req() req
    ) {
        return plainToInstance(
                ComprasResponseDTO,
            await this.comprasService.getByProveedorId(proveedorId),
            {
                groups: []
            }
        );
    }

    // GET BY USER ID
    @Get('user/:userId')
    async ObtenercompraPoruserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
                ComprasResponseDTO,
            await this.comprasService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearCompra(
        @Body () dto: CreateComprasDTO,
        @Req() req
    ) {
        return plainToInstance(
                ComprasResponseDTO,
            await this.comprasService.create(dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY COMPRA ID
    @Delete(':compraId')
    async EliminarcompraPorId(
        @Param('compraId', ParseIntPipe) compraId: number,
        @Req() req
    ) {
        return await this.comprasService.deleteById(compraId);
    }
}