import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresResponseDTO } from './dtos/proveedores-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateProveedoresDTO } from './dtos/create-proveedores.dto';
import { UpdateProveedoresDTO } from './dtos/update-proveedores.dto';

@Controller('proveedores')
export class ProveedoresController {
    constructor(
        private readonly proveedoresService: ProveedoresService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerProveedores(
        @Req() req
    ) {
        return plainToInstance(
            ProveedoresResponseDTO,
            await this.proveedoresService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY PROVEEDOR ID
    @Get(':proveedorId')
    async ObtenerProveedorPorId(
        @Param('proveedorId', ParseIntPipe) proveedorId: number,
        @Req() req
    ) {
        return plainToInstance(
            ProveedoresResponseDTO,
            await this.proveedoresService.getById(proveedorId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearProveedor(
        @Body() dto: CreateProveedoresDTO,
        @Req() req
    ) {
        return plainToInstance(
            ProveedoresResponseDTO,
            await this.proveedoresService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY PROVEEDOR ID
    @Patch(':proveedorId')
    async ActualizarEmpleadoPorId(
        @Body() dto: UpdateProveedoresDTO,
        @Param('proveedorId', ParseIntPipe) proveedorId: number,
        @Req() req
    ) {
        return plainToInstance(
            ProveedoresResponseDTO,
            await this.proveedoresService.update(proveedorId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY PROVEEDOR ID
    @Delete(':proveedorId')
    async EliminarEmpleadoPorId(
        @Param('proveedorId', ParseIntPipe) proveedorId: number,
        @Req() req
    ) {
        return await this.proveedoresService.deleteById(proveedorId);
    }
}