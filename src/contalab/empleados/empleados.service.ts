import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { PersonasService } from '../../personas/personas.service';
import { CreateEmpleadosDTO } from './dtos/create-empleados.dto';
import { UpdateEmpleadosDTO } from './dtos/update-empleados.dto';
import { NominaService } from '../nomina/nomina.service';
import { DetalleNominaService } from '../detalle_nomina/detalle_nomina.service';

@Injectable()
export class EmpleadosService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => PersonasService))
        private readonly personasService: PersonasService,

        @Inject(forwardRef(() => DetalleNominaService))
        private readonly detalleNominaService: DetalleNominaService,
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los empleados de la BD...");
        }

        return data;
    }

    async getById(empleadoId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .select('*')
            .eq('empleado_id', empleadoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el empleado de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al empleado con id '${empleadoId}'...`);
        }

        return data;
    }

    async getByPersonaId(personaId: number) {
        const personaEnBD = await this.personasService.findById(personaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .select('*')
            .eq('persona_id', personaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el empleado de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró al empleado con id de persona '${personaId}'...`);
        }

        return data;
    }

    async create(dto: CreateEmpleadosDTO) {
        const personaEnBD = await this.personasService.findById(dto.persona_id);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .insert(dto)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el empleado en la BD...");
        }

        return data;
    }

    async update(empleadoId: number, dto: UpdateEmpleadosDTO) {
        const empleadoEnBD = await this.getById(empleadoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .update(dto)
            .eq('empleado_id', empleadoId)
            .select()
            .single()

        if (error) {
            throw new InternalServerErrorException(`No se puede actualizar el empleado con id '${empleadoId}' en la BD...`);
        }

        return data;
    }

    async deleteById(empleadoId: number) {
        const empleadoEnBD = await this.getById(empleadoId);

        try {
            await this.detalleNominaService.getByEmpleadoId(empleadoId);

            throw new ConflictException(
                `No se puede eliminar el empleado porque tiene nóminas asociadas...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .delete()
            .eq('empleado_id', empleadoId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el empleado'
            );
        }

        const message = {
            "message": "Empleado eliminado correctamente..."
        }

        return message;
    }

    async deleteByPersonaId(personaId: number) {
        const empleadoEnBD = await this.getByPersonaId(personaId);

        try {
            await this.detalleNominaService.getByEmpleadoId(empleadoEnBD.empleado_id);

            throw new ConflictException(
                `No se puede eliminar el empleado porque tiene nóminas asociadas...`
            );

        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
        }
        
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('empleados')
            .delete()
            .eq('persona_id', personaId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el empleado'
            );
        }

        const message = {
            "message": "Empleado eliminado correctamente..."
        }

        return message;
    }
}