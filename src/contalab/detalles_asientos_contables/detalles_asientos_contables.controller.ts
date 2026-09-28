import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { DetallesAsientosContablesService } from './detalles_asientos_contables.service';
import { DetallesAsientosContablesResponseDTO } from './dtos/detalles_asientos_contables-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateDetallesAsientosContablesDTO } from './dtos/create-detalles_asientos_contables.dto';
import { UpdateDetallesAsientosContablesDTO } from './dtos/update-asientos_contables.dto';

@Controller('detalles-asientos-contables')
export class DetallesAsientosContablesController {
    constructor(
        private readonly detallesAsientosContablesService: DetallesAsientosContablesService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerAsientosContables(
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY DETALLE ID
    @Get('/:detalleId')
    async ObtenerDetallePorId(
        @Param('detalleId', ParseIntPipe) asientoId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.getById(asientoId),
            {
                groups: []
            }
        );
    }

    // GET BY ASIENTO ID
    @Get('/:asientoId')
    async ObtenerDetallePorAsientoId(
        @Param('asientoId', ParseIntPipe) asientoId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.getByAsientoId(asientoId),
            {
                groups: []
            }
        );
    }

    // GET BY CUENTA ID
    @Get('/:cuentaId')
    async ObtenerDetallePorCuentaId(
        @Param('cuentaId', ParseIntPipe) cuentaId: number,
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.getByCuentaId(cuentaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('/')
    async CrearAsientoContable(
        @Body() dto: CreateDetallesAsientosContablesDTO,
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY ID
    @Patch('/:id')
    async ActualizarAsientoContable(
        @Param('id', ParseIntPipe) asientoId: number,
        @Body() dto: UpdateDetallesAsientosContablesDTO,
        @Req() req
    ) {
        return plainToInstance(
            DetallesAsientosContablesResponseDTO,
            this.detallesAsientosContablesService.update(asientoId, dto),
            {
                groups: []
            }
        )
    }

    // DELETE ALL RECORDS
    @Delete('/')
    async EliminarRegistros(
        @Req() req
    ) {
        return this.detallesAsientosContablesService.deleteRecords();
    }

    // DELETE BY DETALLE ID
    @Delete('/:detalleId')
    async EliminarCuenta(
        @Req() req,
        @Param('detalleId', ParseIntPipe) detalleId: number
    ) {
        return this.detallesAsientosContablesService.deleteDetalleById(detalleId);
    }
}
