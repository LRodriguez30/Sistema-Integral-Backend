import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { plainToInstance } from 'class-transformer';
import { EmpleadosResponseDTO } from './dtos/empleados-response.dto';
import { CreateEmpleadosDTO } from './dtos/create-empleados.dto';
import { UpdateEmpleadosDTO } from './dtos/update-empleados.dto';

@Controller('empleados')
export class EmpleadosController {
    constructor(
        private readonly empleadosService: EmpleadosService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerEmpleados(
        @Req() req
    ) {
        return plainToInstance(
            EmpleadosResponseDTO,
            await this.empleadosService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY EMPLEADO ID
    @Get(':empleadoId')
    async ObtenerEmpleadoPorId(
        @Param('empleadoId', ParseIntPipe) empleadoId: number,
        @Req() req
    ) {
        return plainToInstance(
            EmpleadosResponseDTO,
            await this.empleadosService.getById(empleadoId),
            {
                groups: []
            }
        );
    }

    // GET BY PERSONA ID
    @Get('persona/:personaId')
    async ObtenerEmpleadoPorPersonaId(
        @Param('personaId', ParseIntPipe) personaId: number,
        @Req() req
    ) {
        return plainToInstance(
            EmpleadosResponseDTO,
            await this.empleadosService.getByPersonaId(personaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearEmpleado(
        @Body() dto: CreateEmpleadosDTO,
        @Req() req
    ) {
        return plainToInstance(
            EmpleadosResponseDTO,
            await this.empleadosService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY EMPLEADO ID
    @Patch(':empleadoId')
    async ActualizarEmpleadoPorId(
        @Body() dto: UpdateEmpleadosDTO,
        @Param('empleadoId', ParseIntPipe) empleadoId: number,
        @Req() req
    ) {
        return plainToInstance(
            EmpleadosResponseDTO,
            await this.empleadosService.update(empleadoId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY EMPLEADO ID
    @Delete(':empleadoId')
    async EliminarEmpleadoPorId(
        @Param('empleadoId', ParseIntPipe) empleadoId: number,
        @Req() req
    ) {
        return await this.empleadosService.deleteById(empleadoId);
    }

    // DELETE BY PERSONA ID
    @Delete('persona/:personaId')
    async EliminarEmpleadoPorPersonaId(
        @Param('personaId', ParseIntPipe) personaId: number,
        @Req() req
    ) {
        return await this.empleadosService.deleteByPersonaId(personaId);
    }
}