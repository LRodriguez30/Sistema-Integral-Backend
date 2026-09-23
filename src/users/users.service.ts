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
import { PersonasService } from '../personas/personas.service';
import { CreateFullUserDTO } from './dtos/create-full-user.dto';

@Injectable()
export class UsersService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly prismaService: PrismaService,
        private readonly personasService: PersonasService,
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
                PersonaId: dto.persona_id,
                NombreUsuario: dto.nombre_usuario,
                CorreoElectronico: dto.correo_electronico,
                Contrase_a: dto.contraseña,
                RolId: dto.rol_id,
                Estado: dto.estado
            }
        });
    }


    // -----------------------------------------
    // UPDATE
    // -----------------------------------------
    async sqlServerUpdate(dto: UpdateSqlServerUsersDTO, usuarioId: number) {
        const data: any = {};

        if (dto.nombre_usuario !== undefined) {
            data.NombreUsuario = dto.nombre_usuario;
        }

        if (dto.rol_id !== undefined) {
            data.RolId = dto.rol_id;
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
            .schema('core')
            .from('usuarios')
            .select('*')

        if (error) {
            throw new InternalServerErrorException('No se pueden obtener usuarios de la BD...')
        }
        
        return data;
    }

    async findById(usuarioId: number) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('usuarios')
            .select('*')
            .eq('usuario_id', usuarioId)
            .maybeSingle()
        
        if (error) {
            throw new InternalServerErrorException('No se pueden obtener usuarios de la BD...')
        }

        if (!data) {
            throw new NotFoundException(`Usuario con id '${usuarioId}' no encontrado...`);
        }

        return data;
    }

    async findByEmail(correoElectronico: string, optional: boolean) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('usuarios')
            .select('*')
            .eq('correo_electronico', correoElectronico)
            .maybeSingle()

        if (optional) {
            return data;
        }
        
        if (error) {
            throw new InternalServerErrorException('No se pueden obtener usuarios de la BD...');
        }

        if (!data) {
            throw new NotFoundException(`Usuario con correo electrónico '${correoElectronico}' no encontrado...`);
        }

        return data;
    }

    async create(dto: CreateUsersDTO) {
        const contraseñaCifrada = await bcrypt.hash(dto.contraseña, 10);

        if (dto.rol_id === 1) {
            throw new UnauthorizedException("El rol solicitado no está disponible...");
        }

        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('usuarios')
            .insert({
                persona_id: dto.persona_id,
                nombre_usuario: dto.nombre_usuario,
                correo_electronico: dto.correo_electronico,
                contraseña: contraseñaCifrada,
                rol_id: dto.rol_id,
                estado: dto.estado
            })
            .select()
            .single()
        
        if (error) {
            console.log(error)
            throw new ConflictException(`Correo electrónico '${dto.correo_electronico}' ya existe...`);
        }

        return data;
    }

    async createFullUser(dto: CreateFullUserDTO) {
        
        const persona = await this.personasService.create(dto.persona);
        const usuario = await this.create(dto.usuario)

        return {
            persona: persona,
            usuario: usuario
        };
    }

    async grantRole(accion: GrantRole) {
        await this.findById(accion.id)

        const { error } = await this.supabaseClient
            .schema('core')
            .from('usuarios')
            .update({
                rol_id: accion.rol
            })
            .eq('usuario_id', accion.id)
            .single()
        
        if (error) {
            throw new InternalServerErrorException('No se puede actualizar el usuario en la BD...');
        }
    }

    async deleteById(usuarioId: number) {
        await this.findById(usuarioId);

        const { error } = await this.supabaseClient
            .schema('core')
            .from('usuarios')
            .delete()
            .eq('usuario_id', usuarioId)
            .single()
        
        if (error) {
            throw new InternalServerErrorException('No se puede borrar el usuario de la BD...');
        }

        const message = {
            "message": "Usuario eliminado correctamente..."
        }

        return message;
    }
}