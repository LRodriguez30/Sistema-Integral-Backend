import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUsersDTO } from './dtos/create-users.dto';
import * as bcrypt from 'bcryptjs';
import { UsersRole } from './enums/users-role.enum';
import { GrantRole } from './dtos/grant-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSqlServerUsersDTO } from './dtos/create-sqlserver-users.dto';
import { UpdateSqlServerUsersDTO } from './dtos/update-sqlserver-users.dto';

@Injectable()
export class UsersService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly prismaService: PrismaService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    // -----------------------------------------
    // GET
    // -----------------------------------------
    async sqlServerFindAll() {
        return this.prismaService.usuarios.findMany();
    }


    // -----------------------------------------
    // CREATE
    // -----------------------------------------
    async sqlServerCreate(dto: CreateSqlServerUsersDTO) {
        return this.prismaService.usuarios.create({
            data: {
                PersonaId: dto.personaId,
                NombreUsuario: dto.nombreUsuario,
                CorreoElectronico: dto.correoElectronico,
                Contrase_a: dto.contraseña,
                RolId: dto.rolId,
                Estado: dto.estado
            }
        });
    }


    // -----------------------------------------
    // UPDATE
    // -----------------------------------------
    async sqlServerUpdate(dto: UpdateSqlServerUsersDTO, usuarioId: number) {
        const data: any = {};

        if (dto.nombreUsuario !== undefined) {
            data.NombreUsuario = dto.nombreUsuario;
        }

        if (dto.rolId !== undefined) {
            data.RolId = dto.rolId;
        }

        if (dto.estado !== undefined) {
            data.Estado = dto.estado;
        }

        return this.prismaService.usuarios.update({
            where: {
                UsuarioId: usuarioId
            },
            data
        });
    }


    // -----------------------------------------
    // DELETE
    // -----------------------------------------
    async sqlServerDelete(usuarioId: number) {
        return this.prismaService.usuarios.delete({
            where: {
                UsuarioId: usuarioId
            }
        })
    }



    async findAll() {
        const { data, error } = await this.supabaseClient
            .from('users')
            .select('*')

        if (error) {
            throw new InternalServerErrorException('Cannot fetch users from DB...')
        }
        
        return data;
    }

    async findById(userId: string) {
        const { data, error } = await this.supabaseClient
            .from('users')
            .select('*')
            .eq('id', userId)
            .maybeSingle()
        
        if (error) {
            throw new InternalServerErrorException('Cannot fetch user from DB...')
        }

        if (!data) {
            throw new NotFoundException(`User with id '${userId}' not found...`);
        }

        return data;
    }

    async findByEmail(email: string) {
        const { data, error } = await this.supabaseClient
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('Cannot fetch user from DB...');
        }

        if (!data) {
            throw new NotFoundException(`User with email '${email}' not found...`);
        }

        return data;
    }

    async create(dto: CreateUsersDTO) {
        const hashedPassword = await bcrypt.hash(dto.password_hash, 10);

        if (dto.role === "Dueño" || dto.role === "Admin" || dto.role === "Organizador") {
            throw new UnauthorizedException("The requested role is not allowed...");
        }

        const { data, error } = await this.supabaseClient
            .from('users')
            .insert({
                name: dto.name,
                email: dto.email,
                password_hash: hashedPassword,
                role: dto.role
            })
            .select()
            .single()
        
        if (error) {
            console.log(error)
            throw new ConflictException(`Email '${dto.email}' already exists...`);
        }

        return data;
    }

    async grantRole(action: GrantRole) {
        await this.findById(action.id)

        const { error } = await this.supabaseClient
            .from('users')
            .update({
                role: action.role
            })
            .eq('id', action.id)
            .single()
        
        if (error) {
            throw new InternalServerErrorException('Cannot update user from DB...');
        }
    }

    async deleteById(userId: string) {
        await this.findById(userId);

        const { error } = await this.supabaseClient
            .from('users')
            .delete()
            .eq('id', userId)
            .single()
        
        if (error) {
            throw new InternalServerErrorException('Cannot delete user from DB...');
        }

        const message = {
            "message": "User successfully deleted..."
        }

        return message;
    }
}