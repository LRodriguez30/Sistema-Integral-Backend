import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AsientosContablesResponseDTO } from './dtos/asientos_contables-response.dto';
import { AsientosContablesService } from './asientos_contables.service';
import { CreateAsientosContablesDTO } from './dtos/create-asientos_contables.dto';
import { UpdateAsientosContablesDTO } from './dtos/update-asientos_contables.dto';
import { CreateFullAsientosContablesDTO } from './dtos/create-full-asientos_contables.dto';

@Controller('asientos-contables')
export class AsientosContablesController {
    constructor(
        private readonly asientosContablesService: AsientosContablesService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerAsientosContables(
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY ASIENTO ID
    @Get('/:asientoId')
    async ObtenerAsientoContablePorId(
        @Param('asientoId', ParseIntPipe) asientoId: number,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.getById(asientoId),
            {
                groups: []
            }
        );
    }

    // GET BY USER ID
    @Get('/:userId')
    async ObtenerAsientoContablePorUsuarioId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.getByUserId(userId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('/')
    async CrearAsientoContable(
        @Body() dto: CreateAsientosContablesDTO,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.create(dto),
            {
                groups: []
            }
        );
    }

    // CREATE FULL
    @Post('/full')
    async CrearAsientoContableCompleto(
        @Body() dto: CreateFullAsientosContablesDTO,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.createFull(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY ID
    @Patch('/:id')
    async ActualizarAsientoContable(
        @Param('id', ParseIntPipe) asientoId: number,
        @Body() dto: UpdateAsientosContablesDTO,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.update(asientoId, dto),
            {
                groups: []
            }
        )
    }

    // CREATE BASE LAYOUT
    @Post('/layout')
    async IniciarPlantillaBase(
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.createBaseLayout()
        )
    }

    // CREATE FULL BASE LAYOUT
    @Post('/full-layout')
    async IniciarPlantillaBaseCompleta(
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.createFullBaseLayout()
        )
    }

    // DELETE ALL RECORDS
    @Delete('/')
    async EliminarRegistros(
        @Req() req
    ) {
        return this.asientosContablesService.deleteRecords();
    }

    // DELETE BY ASIENTO ID
    @Delete('/:asientoId')
    async EliminarCuenta(
        @Req() req,
        @Param('asientoId', ParseIntPipe) asientoId: number
    ) {
        return this.asientosContablesService.deleteAsientoById(asientoId);
    }
}