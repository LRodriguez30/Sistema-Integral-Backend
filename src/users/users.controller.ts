import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResponseDTO } from './dtos/users-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUsersDTO } from './dtos/create-users.dto';
import { JwtAccessGuard } from '../auth/jwt/access/access.guard';
import { UsersRole } from './enums/users-role.enum';
import { GrantRole } from './dtos/grant-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerUsersDTO } from './dtos/create-sqlserver-users.dto';
import { UpdateSqlServerUsersDTO } from './dtos/update-sqlserver-users.dto';

// @UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    // -----------------------------------------
    // GET
    // -----------------------------------------
    @Get('sqlServer')
    async getAllSqlServerUsers(@Req() req) {
        console.log({
            server: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            passwordExists: !!process.env.DB_PASSWORD,
        });

        console.log("Solicitando información de SQL Server usando Prisma...");

        return await this.usersService.sqlServerFindAll();
    }


    // -----------------------------------------
    // POST
    // -----------------------------------------
    @Post('sqlServer')
    async createSqlServerUser(
        @Body() dto: CreateSqlServerUsersDTO
    ) {
        console.log("Creando usuario en BD...");

        return await this.usersService.sqlServerCreate(dto);
    }


    // -----------------------------------------
    // PATCH
    // -----------------------------------------
    @Patch('sqlServer')
    async patchSqlServerUser(
        @Body() dto: UpdateSqlServerUsersDTO,
        @Param('UsuarioId', ParseIntPipe) usuarioId: number
    ) {
        console.log("Actualizando usuario en BD...");
        return this.usersService.sqlServerUpdate(dto, usuarioId);
    }


    // -----------------------------------------
    // DELETE
    // -----------------------------------------
    @Delete('sqlServer')
    async deleteSqlServerUser(
        @Param('UsuarioId', ParseIntPipe) usuarioId: number
    ) {
        console.log("Eliminando usuario de la BD...");
        return this.usersService.sqlServerDelete(usuarioId);
    }


    // ----------
    // GET      *
    // ----------

    // users/
    @Get('')
    async getAllUsers(@Req() req) {
        console.log("Información de usuarios solicitada...");
        const userAccess = req.user.role;

        return plainToInstance(
            UsersResponseDTO,
            await this.usersService.findAll(),
            {
                groups: [userAccess]
            }
        )
    }

    // users/:id
    @Get(':id')
    async getUserById(
        @Param('id', ParseUUIDPipe) userId: string,
        @Req() req
    ) {
        console.log("Información de un usuario en particular solicitada...");
        const userAccess = req.user.role;

        return plainToInstance(
            UsersResponseDTO,
            await this.usersService.findById(userId),
            {
                groups: [userAccess]
            }
        );
    }

    // users/email/:email
    @Get('email/:email')
    async getUserByEmail(
        @Param('email') email: string,
        @Req() req
    ) {
        console.log("Información de un usuario en particual solicitada...");
        const userAccess = req.user.role;

        return plainToInstance(
            UsersResponseDTO,
            await this.usersService.findByEmail(email),
            {
                groups: [userAccess]
            }
        )
    }


    // ----------
    // POST     *
    // ----------

    // users/
    @Post('')
    async createUser(
        @Body() dto: CreateUsersDTO,
        @Req() req
    ) {
        console.log("Creando usuario en BD...");
        const userAccess = req.user.role;

        return plainToInstance(
            UsersResponseDTO,
            await this.usersService.create(dto),
            {
                groups: [userAccess]
            }
        );
    }


    // ----------
    // PATCH    *
    // ----------

    // users/role/:id
    @Patch('role')
    async updateRole(
        @Body() action: GrantRole,
        @Req() req
    ) {
        console.log("Actualizando la actividad de un participante de la sesión solicitada...");
        const userAccess = req.user.role;

        return plainToInstance(
            UsersResponseDTO,
            await this.usersService.grantRole(action),
            {
                groups: [userAccess]
            }
        )
    }

    // ----------
    // DELETE   *
    // ----------

    // users/:id
    @Delete(':id')
    async deleteUserById(@Param('id', ParseUUIDPipe) userId: string) {
        console.log("Eliminando usuario en BD...");
        return await this.usersService.deleteById(userId);
    }
}