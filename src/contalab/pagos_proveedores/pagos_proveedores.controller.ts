import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { PagosProveedoresService } from './pagos_proveedores.service';
import { PagosProveedoresResponseDTO } from './dtos/pagos_proveedores-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreatePagosProveedoresDTO } from './dtos/create-pagos_proveedores.dto';
import { UpdatePagosProveedoresDTO } from './dtos/update-pagos_proveedores.dto';

@Controller('pagos-proveedores')
export class PagosProveedoresController {
    constructor(
        private readonly pagosProveedoresService: PagosProveedoresService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerPagos(
        @Req() req
    ) {
        return plainToInstance(
            PagosProveedoresResponseDTO,
            await this.pagosProveedoresService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY PAGO ID
    @Get(':pagoId')
    async ObtenerPagoPorId(
        @Param('pagoId', ParseIntPipe) pagoId: number,
        @Req() req
    ) {
        return plainToInstance(
            PagosProveedoresResponseDTO,
            await this.pagosProveedoresService.getById(pagoId),
            {
                groups: []
            }
        );
    }

    // GET BY USER ID
    @Get('user/:userId')
    async ObtenerPagoPoruserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
            PagosProveedoresResponseDTO,
            await this.pagosProveedoresService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearPago(
        @Body() dto: CreatePagosProveedoresDTO,
        @Req() req
    ) {
        return plainToInstance(
            PagosProveedoresResponseDTO,
            await this.pagosProveedoresService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY PAGO ID
    @Patch(':pagoId')
    async ActualizarPagoPorId(
        @Body() dto: UpdatePagosProveedoresDTO,
        @Param('pagoId', ParseIntPipe) pagoId: number,
        @Req() req
    ) {
        return plainToInstance(
            PagosProveedoresResponseDTO,
            await this.pagosProveedoresService.update(pagoId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY PAGO ID
    @Delete(':pagoId')
    async EliminarEmpleadoPorId(
        @Param('pagoId', ParseIntPipe) pagoId: number,
        @Req() req
    ) {
        return await this.pagosProveedoresService.deleteById(pagoId);
    }
}