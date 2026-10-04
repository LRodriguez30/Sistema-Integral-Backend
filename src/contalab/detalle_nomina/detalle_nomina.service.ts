import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { NominaService } from '../nomina/nomina.service';
import { EmpleadosService } from '../empleados/empleados.service';
import { CreateDetalleNominaDTO } from './dtos/create-detalle_nomina.dto';
import { CalculoNominaHelper } from './helpers/calculo_nomina.helper';
import { CreateDetalleNominaCalculadoDTO } from './dtos/create-detalle_nomina_calculado.dto';
import { EmpleadosResponseDTO } from '../empleados/dtos/empleados-response.dto';

@Injectable()
export class DetalleNominaService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,

        @Inject(forwardRef(() => NominaService))
        private readonly nominaService: NominaService,

        @Inject(forwardRef(() => EmpleadosService))
        private readonly empleadosService: EmpleadosService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_nomina')
            .select('*')

        if (error) {
            throw new InternalServerErrorException("No se pueden obtener los detalles de las nominas de la BD...");
        }

        return data;
    }

    async getById(detalleNominaId: number) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_nomina')
            .select('*')
            .eq('detalle_nomina_id', detalleNominaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle con id '${detalleNominaId}'...`);
        }

        return data;
    }

    async getByNominaId(nominaId: number) {
        const nominaEnBD = await this.nominaService.getById(nominaId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_nomina')
            .select('*')
            .eq('nomina_id', nominaId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la nomina de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle de la nomina con id '${nominaId}'...`);
        }

        return data;
    }

    async getByEmpleadoId(empleadoId: number) {
        const empleadoEnBD = await this.empleadosService.getById(empleadoId);

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_nomina')
            .select('*')
            .eq('empleado_id', empleadoId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException("No se puede obtener el detalle de la nomina de la BD...");
        }

        if (!data) {
            throw new NotFoundException(`No se encontró el detalle de la nomina con id de empleado '${empleadoId}'...`);
        }

        return data;
    }

    async create(dto: CreateDetalleNominaDTO[]) {
        for (const detalle of dto) {
            const nominaEnBD = await this.nominaService.getById(detalle.nomina_id);
            const empleadoEnBD = await this.empleadosService.getById(detalle.empleado_id);
        }

        const cantidadEmpleados = (await this.empleadosService.getAll()).length;

        const dtoCalculado: CreateDetalleNominaCalculadoDTO[] = [];
        
        for (const detalle of dto) {
            const empleadoEnBD = await
                this.empleadosService
                    .getById(detalle.empleado_id) as EmpleadosResponseDTO;

            const ingreso = new Date(empleadoEnBD.fecha_ingreso);
            const actual = new Date();

            let años =
                actual.getFullYear() -
                ingreso.getFullYear()
            
            const añoCompleto =
                actual.getMonth() > ingreso.getMonth() ||
                (
                    actual.getMonth() === ingreso.getMonth() &&
                    actual.getDate() >= ingreso.getDate()
                );

            if (!añoCompleto) {
                años--;
            }

            const salarioQuincenal =
                CalculoNominaHelper.salarioQuincenal(
                    detalle.salario_base
                );

            const ingresoHorasExtras =
                CalculoNominaHelper.ingresoHorasExtras(
                    detalle.salario_base,
                    detalle.horas_extras
                );

            const totalIngresos =
                CalculoNominaHelper.totalIngresos(
                    salarioQuincenal,
                    ingresoHorasExtras
                );

            const inssLaboral =
                CalculoNominaHelper.inssLaboral(
                    detalle.salario_base
                );

            const ir =
                CalculoNominaHelper.irMensual(
                    detalle.salario_base
                );

            const totalDeducciones =
                CalculoNominaHelper.totalDeducciones(
                    inssLaboral,
                    ir
                );

            const salarioNeto =
                CalculoNominaHelper.salarioNeto(
                    totalIngresos,
                    totalDeducciones
                );

            const inatec =
                CalculoNominaHelper.inatec(
                    detalle.salario_base
                );

            const inssPatronal =
                CalculoNominaHelper.inssPatronal(
                    detalle.salario_base,
                    cantidadEmpleados
                );

            const vacaciones =
                CalculoNominaHelper.vacaciones(
                    detalle.salario_base
                );

            const treceavoMes =
                CalculoNominaHelper.treceavoMes(
                    detalle.salario_base
                );

            const indemnizacion =
                CalculoNominaHelper.indemnizacion(
                    detalle.salario_base,
                    años
                );

            dtoCalculado.push({
                nomina_id: detalle.nomina_id,
                empleado_id: detalle.empleado_id,
                salario_base: detalle.salario_base,
                salario_quincenal: salarioQuincenal,
                horas_extras: detalle.horas_extras,
                ingreso_horas_extras: ingresoHorasExtras,
                total_ingresos: totalIngresos,
                inss_laboral: inssLaboral,
                ir: ir,
                total_deducciones: totalDeducciones,
                salario_neto: salarioNeto,
                inatec,
                inss_patronal: inssPatronal,
                vacaciones,
                treceavo_mes: treceavoMes,
                indemnización: indemnizacion
            });
        }
        
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('detalle_nomina')
            .upsert(dtoCalculado, {
                onConflict: 'nomina_id,empleado_id'
            })
            .select()

        if (error) {
            throw new InternalServerErrorException("No se puede crear el/los detalle/s en la BD...");
        }

        return data;
    }
}