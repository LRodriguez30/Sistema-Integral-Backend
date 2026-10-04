export class CalculoNominaHelper {

    /**
     * Salario correspondiente a una quincena.
     */
    static salarioQuincenal(
        salarioBase: number
    ): number {

        return salarioBase / 2;
    }

    /**
     * Salario correspondiente a un día de trabajo.
     */
    static salarioDiario(
        salarioBase: number
    ): number {

        return salarioBase / 30;
    }

    /**
     * Valor de una hora ordinaria.
     *
     * Jornada de referencia: 8 horas diarias.
     */
    static salarioHora(
        salarioBase: number
    ): number {

        return (
            salarioBase /
            30 /
            8
        );
    }

    /**
     * Valor de una hora extraordinaria.
     *
     * La hora extra se remunera el doble
     * del valor de la hora ordinaria.
     */
    static valorHoraExtra(
        salarioBase: number
    ): number {

        return (
            this.salarioHora(salarioBase) *
            2
        );
    }

    /**
     * Ingreso generado por horas extras.
     */
    static ingresoHorasExtras(
        salarioBase: number,
        horasExtras: number
    ): number {

        return (
            this.valorHoraExtra(salarioBase) *
            horasExtras
        );
    }

    /**
     * Total de ingresos de la nómina.
     */
    static totalIngresos(
        salarioQuincenal: number,
        ingresoHorasExtras: number
    ): number {

        return (
            salarioQuincenal +
            ingresoHorasExtras
        );
    }

    /**
     * INSS laboral.
     */
    static inssLaboral(
        salarioBase: number
    ): number {

        return salarioBase * 0.07;
    }

    /**
     * Calcula el IR anual según la tabla progresiva.
     */
    static irAnual(
        rentaNetaAnual: number
    ): number {

        if (rentaNetaAnual <= 100_000) {
            return 0;
        }

        if (rentaNetaAnual <= 200_000) {
            return (
                (rentaNetaAnual - 100_000) *
                0.15
            );
        }

        if (rentaNetaAnual <= 350_000) {
            return (
                15_000 +
                (rentaNetaAnual - 200_000) *
                0.20
            );
        }

        if (rentaNetaAnual <= 500_000) {
            return (
                45_000 +
                (rentaNetaAnual - 350_000) *
                0.25
            );
        }

        return (
            82_500 +
            (rentaNetaAnual - 500_000) *
            0.30
        );
    }

    /**
     * IR mensual proyectado.
     */
    static irMensual(
        salarioBase: number
    ): number {

        const ingresoAnual =
            salarioBase * 12;

        const inssAnual =
            this.inssLaboral(
                salarioBase
            ) * 12;

        const rentaNetaAnual =
            ingresoAnual -
            inssAnual;

        return (
            this.irAnual(
                rentaNetaAnual
            ) / 12
        );
    }

    /**
     * Total de deducciones del trabajador.
     */
    static totalDeducciones(
        inssLaboral: number,
        ir: number
    ): number {

        return (
            inssLaboral +
            ir
        );
    }

    /**
     * Salario neto recibido por el trabajador.
     */
    static salarioNeto(
        totalIngresos: number,
        totalDeducciones: number
    ): number {

        return (
            totalIngresos -
            totalDeducciones
        );
    }

    /**
     * INSS patronal.
     *
     * Menos de 50 trabajadores: 21.5%
     * 50 trabajadores o más: 22.5%
     */
    static inssPatronal(
        base: number,
        cantidadEmpleados: number
    ): number {

        const porcentaje =
            cantidadEmpleados < 50
                ? 0.215
                : 0.225;

        return base * porcentaje;
    }

    /**
     * Aporte patronal al INATEC.
     */
    static inatec(
        base: number
    ): number {

        return base * 0.02;
    }

    /**
     * Provisión mensual de vacaciones.
     *
     * 15 días por cada 6 meses
     * = 2.5 días por mes.
     */
    static vacaciones(
        salarioBase: number
    ): number {

        return (
            this.salarioDiario(
                salarioBase
            ) * 2.5
        );
    }

    /**
     * Provisión mensual del décimo tercer mes.
     */
    static treceavoMes(
        salarioBase: number
    ): number {

        return salarioBase / 12;
    }

    /**
     * Indemnización según años trabajados.
     *
     * Primeros 3 años:
     * 1 mes de salario por año.
     *
     * A partir del cuarto:
     * 20 días de salario por año.
     *
     * Máximo: 5 meses de salario.
     */
    static indemnizacion(
        salarioBase: number,
        añosTrabajados: number
    ): number {

        if (añosTrabajados <= 0) {
            return 0;
        }

        const primerosTresAños =
            Math.min(
                añosTrabajados,
                3
            );

        let mesesIndemnizacion =
            primerosTresAños;

        if (añosTrabajados > 3) {

            const añosAdicionales =
                añosTrabajados - 3;

            mesesIndemnizacion +=
                añosAdicionales *
                (20 / 30);
        }

        mesesIndemnizacion =
            Math.min(
                mesesIndemnizacion,
                5
            );

        return (
            salarioBase *
            mesesIndemnizacion
        );
    }
}