import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetallePagoProveedorService } from './detalle_pago_proveedor.service';
import { plainToInstance } from 'class-transformer';
import { DetallePagoProveedorResponseDTO } from './dtos/detalle_pago_proveedor-response.dto';
import { CreateDetallePagoProveedorDTO } from './dtos/create-detalle_pago_proveedor.dto';
import { UpdateDetallePagoProveedorDTO } from './dtos/update-detalle_pago_proveedor.dto';

@Controller('detalle-pago-proveedor')
export class DetallePagoProveedorController {
    constructor(
        private readonly detallePagoProveedorService: DetallePagoProveedorService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerDetalles(
        @Req() req
    ) {
        return plainToInstance(
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.getAll(),
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
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.getById(detalleId),
            {
                groups: []
            }
        );
    }

    // GET BY PAGO ID
    @Get('pago/:padoId')
    async ObtenerDetallePorPagoId(
        @Param('pagoId', ParseIntPipe) pagoId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.getByPagoId(pagoId),
            {
                groups: []
            }
        );
    }

    // GET BY COMPRA ID
    @Get('compra/:compraId')
    async ObtenerDetallePorCompraId(
        @Param('compraId', ParseIntPipe) compraId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.getByCompraId(compraId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearDetalle(
        @Body() dto: CreateDetallePagoProveedorDTO,
        @Req() req
    ) {
        return plainToInstance(
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY DETALLE ID
    @Patch(':detalleId')
    async ActualizarDetallePorId(
        @Body() dto: UpdateDetallePagoProveedorDTO,
        @Param('detalleId', ParseIntPipe) detalleId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallePagoProveedorResponseDTO,
            await this.detallePagoProveedorService.update(detalleId, dto),
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
        return await this.detallePagoProveedorService.deleteById(detalleId);
    }
}