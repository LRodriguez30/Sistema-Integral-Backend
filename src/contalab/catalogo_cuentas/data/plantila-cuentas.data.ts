export const plantillaCuentas = [

    /* =========================================================
       ACTIVOS
    ========================================================= */

    {
        codigo_cuenta: '1',
        nombre_cuenta: 'ACTIVOS',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '1.1',
        nombre_cuenta: 'ACTIVOS CORRIENTES',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 1,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '1.1.01',
        nombre_cuenta: 'EFECTIVO Y EQUIVALENTES DE EFECTIVO',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 2,
        nivel_cuenta: 3,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '1.1.01.01',
        nombre_cuenta: 'CAJA',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 3,
        nivel_cuenta: 4,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '1.1.01.02',
        nombre_cuenta: 'BANCOS',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 3,
        nivel_cuenta: 4,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '1.1.02',
        nombre_cuenta: 'CUENTAS POR COBRAR',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 2,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '1.1.03',
        nombre_cuenta: 'INVENTARIOS',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 2,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '1.2',
        nombre_cuenta: 'ACTIVOS NO CORRIENTES',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 1,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '1.2.01',
        nombre_cuenta: 'PROPIEDAD, PLANTA Y EQUIPO',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 8,
        nivel_cuenta: 3,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '1.2.01.01',
        nombre_cuenta: 'EQUIPO DE OFICINA',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 9,
        nivel_cuenta: 4,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '1.2.01.02',
        nombre_cuenta: 'EQUIPO DE COMPUTACIÓN',
        tipo_cuenta: 'ACTIVO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 9,
        nivel_cuenta: 4,
        permite_movimiento: true,
        estado: true
    },


    /* =========================================================
       PASIVOS
    ========================================================= */

    {
        codigo_cuenta: '2',
        nombre_cuenta: 'PASIVOS',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '2.1',
        nombre_cuenta: 'PASIVOS CORRIENTES',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 12,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '2.1.01',
        nombre_cuenta: 'CUENTAS POR PAGAR',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 13,
        nivel_cuenta: 3,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '2.1.01.01',
        nombre_cuenta: 'PROVEEDORES',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 14,
        nivel_cuenta: 4,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '2.1.02',
        nombre_cuenta: 'OBLIGACIONES FISCALES',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 13,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '2.2',
        nombre_cuenta: 'PASIVOS NO CORRIENTES',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 12,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '2.2.01',
        nombre_cuenta: 'PRÉSTAMOS A LARGO PLAZO',
        tipo_cuenta: 'PASIVO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 17,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },


    /* =========================================================
       PATRIMONIO
    ========================================================= */

    {
        codigo_cuenta: '3',
        nombre_cuenta: 'PATRIMONIO',
        tipo_cuenta: 'PATRIMONIO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '3.1',
        nombre_cuenta: 'CAPITAL',
        tipo_cuenta: 'PATRIMONIO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 19,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '3.1.01',
        nombre_cuenta: 'CAPITAL SOCIAL',
        tipo_cuenta: 'PATRIMONIO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 20,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '3.2',
        nombre_cuenta: 'RESULTADOS ACUMULADOS',
        tipo_cuenta: 'PATRIMONIO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 19,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '3.2.01',
        nombre_cuenta: 'UTILIDADES RETENIDAS',
        tipo_cuenta: 'PATRIMONIO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 22,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },


    /* =========================================================
       INGRESOS
    ========================================================= */

    {
        codigo_cuenta: '4',
        nombre_cuenta: 'INGRESOS',
        tipo_cuenta: 'INGRESO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '4.1',
        nombre_cuenta: 'INGRESOS OPERACIONALES',
        tipo_cuenta: 'INGRESO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 24,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '4.1.01',
        nombre_cuenta: 'VENTAS',
        tipo_cuenta: 'INGRESO',
        naturaleza: 'ACREEDORA',
        cuenta_padre_id: 25,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },


    /* =========================================================
       COSTOS
    ========================================================= */

    {
        codigo_cuenta: '5',
        nombre_cuenta: 'COSTOS',
        tipo_cuenta: 'COSTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '5.1',
        nombre_cuenta: 'COSTOS DE VENTA',
        tipo_cuenta: 'COSTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 27,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '5.1.01',
        nombre_cuenta: 'COSTO DE MERCANCÍAS VENDIDAS',
        tipo_cuenta: 'COSTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 28,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },


    /* =========================================================
       GASTOS
    ========================================================= */

    {
        codigo_cuenta: '6',
        nombre_cuenta: 'GASTOS',
        tipo_cuenta: 'GASTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: null,
        nivel_cuenta: 1,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '6.1',
        nombre_cuenta: 'GASTOS OPERACIONALES',
        tipo_cuenta: 'GASTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 30,
        nivel_cuenta: 2,
        permite_movimiento: false,
        estado: true
    },

    {
        codigo_cuenta: '6.1.01',
        nombre_cuenta: 'GASTOS ADMINISTRATIVOS',
        tipo_cuenta: 'GASTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 31,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    },

    {
        codigo_cuenta: '6.1.02',
        nombre_cuenta: 'GASTOS DE VENTA',
        tipo_cuenta: 'GASTO',
        naturaleza: 'DEUDORA',
        cuenta_padre_id: 31,
        nivel_cuenta: 3,
        permite_movimiento: true,
        estado: true
    }

] as const;