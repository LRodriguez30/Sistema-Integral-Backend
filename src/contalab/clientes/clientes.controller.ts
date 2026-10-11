import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { plainToInstance } from 'class-transformer';
import { ClientesResponseDTO } from './dtos/clientes-response.dto';
import { CreateClientesDTO } from './dtos/create-clientes.dto';
import { UpdateClientesDTO } from './dtos/update-clientes.dto';

@Controller('clientes')
export class ClientesController {
    constructor(
        private readonly clientesService: ClientesService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerClientes(
        @Req() req
    ) {
        return plainToInstance(
            ClientesResponseDTO,
            await this.clientesService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY CLIENTE ID
    @Get(':clienteId')
    async ObtenerClientePorId(
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return plainToInstance(
            ClientesResponseDTO,
            await this.clientesService.getById(clienteId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearCliente(
        @Body() dto: CreateClientesDTO,
        @Req() req
    ) {
        return plainToInstance(
            ClientesResponseDTO,
            await this.clientesService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY CLIENTE ID
    @Patch(':clienteId')
    async ActualizarEmpleadoPorId(
        @Body() dto: UpdateClientesDTO,
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return plainToInstance(
            ClientesResponseDTO,
            await this.clientesService.update(clienteId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY CLIENTE ID
    @Delete(':clienteId')
    async EliminarEmpleadoPorId(
        @Param('clienteId', ParseIntPipe) clienteId: number,
        @Req() req
    ) {
        return await this.clientesService.deleteById(clienteId);
    }
}