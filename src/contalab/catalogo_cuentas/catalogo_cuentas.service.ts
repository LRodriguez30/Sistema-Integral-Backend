import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { UpsertCuentaDTO } from './dtos/upsert-cuenta.dto';

import { plantillaCuentas } from './data/plantila-cuentas.data';

@Injectable()
export class CatalogoCuentasService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    };

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .select('*')
        
        if (error) {
            throw new InternalServerErrorException('No se puede obtener el catalogo de cuentas de la BD...')
        }
        
        return data;
    }

    async createCuenta(dto: UpsertCuentaDTO) {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .insert(dto)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se puede crear la cuenta en la BD.'
            );
        }

        return data;
    }

    async updateCuenta(
        dto: UpsertCuentaDTO,
        cuenta_id: number
    ) {

        // =============================================================
        // OBTENER CUENTA ACTUAL
        // =============================================================

        const { data: cuentaActual, error: cuentaError } =
            await this.supabaseClient
                .schema('contalab')
                .from('catalogo_cuentas')
                .select('cuenta_id')
                .eq('cuenta_id', cuenta_id)
                .single();

        if (cuentaError || !cuentaActual) {
            throw new ConflictException(
                'La cuenta que se intenta actualizar no existe.'
            );
        }


        // =============================================================
        // VERIFICAR CUENTAS HIJAS
        // =============================================================

        const { data: hijos, error: hijosError } =
            await this.supabaseClient
                .schema('contalab')
                .from('catalogo_cuentas')
                .select('cuenta_id, estado')
                .eq('cuenta_padre_id', cuenta_id);

        if (hijosError) {
            throw new InternalServerErrorException(
                'No se pudieron verificar las cuentas hijas.'
            );
        }


        // =============================================================
        // VALIDAR PERMITE MOVIMIENTO
        // =============================================================

        if (hijos.length > 0 && dto.permite_movimiento) {
            throw new ConflictException(
                'No se puede permitir movimientos porque la cuenta tiene cuentas hijas.'
            );
        }


        // =============================================================
        // VALIDAR ESTADO
        // =============================================================

        const tieneHijosActivos = hijos.some(
            hijo => hijo.estado
        );

        if (tieneHijosActivos && !dto.estado) {
            throw new ConflictException(
                'No se puede desactivar la cuenta porque tiene cuentas hijas activas.'
            );
        }


        // =============================================================
        // DETERMINAR NIVEL DE LA CUENTA
        // =============================================================

        let nivelCuenta = 1;

        if (dto.cuenta_padre_id !== null) {

            // ---------------------------------------------------------
            // BUSCAR CUENTA PADRE
            // ---------------------------------------------------------

            const { data: padre, error: padreError } =
                await this.supabaseClient
                    .schema('contalab')
                    .from('catalogo_cuentas')
                    .select(
                        'cuenta_id, nivel_cuenta, tipo_cuenta, naturaleza, permite_movimiento, estado'
                    )
                    .eq('cuenta_id', dto.cuenta_padre_id)
                    .single();

            if (padreError || !padre) {
                throw new ConflictException(
                    'La cuenta padre seleccionada no existe.'
                );
            }


            // ---------------------------------------------------------
            // EVITAR QUE UNA CUENTA SEA SU PROPIA PADRE
            // ---------------------------------------------------------

            if (padre.cuenta_id === cuenta_id) {
                throw new ConflictException(
                    'Una cuenta no puede ser su propia cuenta padre.'
                );
            }


            // ---------------------------------------------------------
            // LA CUENTA PADRE DEBE SER ESTRUCTURAL
            // ---------------------------------------------------------

            if (padre.permite_movimiento) {
                throw new ConflictException(
                    'La cuenta padre debe ser una cuenta que no permita movimientos.'
                );
            }


            // ---------------------------------------------------------
            // LA CUENTA PADRE DEBE ESTAR ACTIVA
            // ---------------------------------------------------------

            if (!padre.estado) {
                throw new ConflictException(
                    'No se puede asignar una cuenta inactiva como cuenta padre.'
                );
            }


            // ---------------------------------------------------------
            // CALCULAR NIVEL
            // ---------------------------------------------------------

            nivelCuenta = padre.nivel_cuenta + 1;
        }


        // =============================================================
        // PREPARAR DATOS
        // =============================================================

        const datosActualizados = {
            ...dto,
            nivel_cuenta: nivelCuenta
        };


        // =============================================================
        // ACTUALIZAR
        // =============================================================

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .update(datosActualizados)
            .eq('cuenta_id', cuenta_id)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'No se puede actualizar la cuenta en la BD.'
            );
        }

        return data;
    }

    async createBaseLayout() {
        const cuentas = await this.getAll();

        if (cuentas.length !== 0) {
            throw new ConflictException(
                'No se puede generar la plantilla base porque el catálogo de cuentas ya contiene datos.'
            );
        }

        const { error: rpc_error } = await this.supabaseClient
            .schema('contalab')
            .rpc('reset_catalogo_cuentas_sequence');

        if (rpc_error) {
            throw new InternalServerErrorException(
                'No se pudo reiniciar la secuencia del catálogo de cuentas.'
            );
        }

        const { data, error: cc_error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .upsert(plantillaCuentas, {
                onConflict: 'cuenta_id'
            })
            .select()

        if (cc_error) {
            throw new InternalServerErrorException("No se puede crear la cuenta en la BD...");
        }

        return data;
    }

    async deleteRecords() {
        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .delete()
            .neq('cuenta_id', 0)
        
        if (error) {
            throw new InternalServerErrorException("No se pueden borrar los registros en BD...")
        }

        const message = {
            "message": "Registros eliminados correctamente..."
        }

        return message;
    }

    async deleteCuentaById(cuenta_id: number) {
        // Verificar si tiene cuentas hijas
        const { data: hijos, error: hijosError } =
            await this.supabaseClient
                .schema('contalab')
                .from('catalogo_cuentas')
                .select('cuenta_id, codigo_cuenta, nombre_cuenta')
                .eq('cuenta_padre_id', cuenta_id);

        if (hijosError) {
            console.error('ERROR VERIFICANDO HIJOS:', hijosError);

            throw new InternalServerErrorException(
                'No se pudo verificar si la cuenta tiene cuentas hijas.'
            );
        }

        if (hijos.length > 0) {
            throw new ConflictException(
                'No se puede eliminar la cuenta porque tiene cuentas hijas.'
            );
        }

        const { data, error } = await this.supabaseClient
            .schema('contalab')
            .from('catalogo_cuentas')
            .delete()
            .eq('cuenta_id', cuenta_id)
            .select()
            .single();

        if (error) {
            console.error('SUPABASE DELETE ERROR:', error);

            throw new InternalServerErrorException(
                error.message
            );
        }

        const message = {
            "message": "Cuenta eliminada correctamente..."
        }

        return message;
    }

    async deleteCuentaRama(cuenta_id: number) {

        const { error } = await this.supabaseClient
            .schema('contalab')
            .rpc('delete_catalogo_cuenta_rama', {
                p_cuenta_id: cuenta_id
            });

        if (error) {
            console.error('SUPABASE DELETE BRANCH ERROR:', error);

            throw new InternalServerErrorException(
                'No se pudo eliminar la rama de cuentas.'
            );
        }

        return {
            message: 'Rama de cuentas eliminada correctamente.'
        };
    }
}
