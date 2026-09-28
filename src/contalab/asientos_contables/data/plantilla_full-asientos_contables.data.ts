import { TipoOrigen } from "../enums/tipo-origen.enum";

export const plantillaFullAsientosContables = [

    /* =========================================================
       APERTURA
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-01'),
            concepto: 'Aporte de capital inicial',
            tipo_origen: TipoOrigen.BANCO,
            total_debe: 10000,
            total_haber: 10000
        },

        detalles_asientos_contables: [
            {
                debe: 10000,
                haber: 0,
                asiento_id: 1,
                cuenta_id: 5 // BANCOS
            },
            {
                debe: 0,
                haber: 10000,
                asiento_id: 1,
                cuenta_id: 21 // CAPITAL SOCIAL
            }
        ]
    },


    /* =========================================================
       COMPRA
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-05'),
            concepto: 'Compra de mercadería al contado',
            tipo_origen: TipoOrigen.COMPRA,
            total_debe: 10000,
            total_haber: 10000
        },

        detalles_asientos_contables: [
            {
                debe: 10000,
                haber: 0,
                asiento_id: 2,
                cuenta_id: 7 // INVENTARIOS
            },
            {
                debe: 0,
                haber: 10000,
                asiento_id: 2,
                cuenta_id: 5 // BANCOS
            }
        ]
    },


    /* =========================================================
       COMPRA A CRÉDITO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-07'),
            concepto: 'Compra de mercadería a crédito',
            tipo_origen: TipoOrigen.COMPRA,
            total_debe: 15000,
            total_haber: 15000
        },

        detalles_asientos_contables: [
            {
                debe: 15000,
                haber: 0,
                asiento_id: 3,
                cuenta_id: 7 // INVENTARIOS
            },
            {
                debe: 0,
                haber: 15000,
                asiento_id: 3,
                cuenta_id: 15 // PROVEEDORES
            }
        ]
    },


    /* =========================================================
       VENTA
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-10'),
            concepto: 'Venta de mercadería al contado',
            tipo_origen: TipoOrigen.VENTA,
            total_debe: 20000,
            total_haber: 20000
        },

        detalles_asientos_contables: [
            {
                debe: 20000,
                haber: 0,
                asiento_id: 4,
                cuenta_id: 5 // BANCOS
            },
            {
                debe: 0,
                haber: 20000,
                asiento_id: 4,
                cuenta_id: 26 // VENTAS
            }
        ]
    },


    /* =========================================================
       VENTA A CRÉDITO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-12'),
            concepto: 'Venta de mercadería a crédito',
            tipo_origen: TipoOrigen.VENTA,
            total_debe: 30000,
            total_haber: 30000
        },

        detalles_asientos_contables: [
            {
                debe: 30000,
                haber: 0,
                asiento_id: 5,
                cuenta_id: 6 // CUENTAS POR COBRAR
            },
            {
                debe: 0,
                haber: 30000,
                asiento_id: 5,
                cuenta_id: 26 // VENTAS
            }
        ]
    },


    /* =========================================================
       COBRO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-15'),
            concepto: 'Cobro de cuenta pendiente a cliente',
            tipo_origen: TipoOrigen.CAJA,
            total_debe: 12000,
            total_haber: 12000
        },

        detalles_asientos_contables: [
            {
                debe: 12000,
                haber: 0,
                asiento_id: 6,
                cuenta_id: 5 // BANCOS
            },
            {
                debe: 0,
                haber: 12000,
                asiento_id: 6,
                cuenta_id: 6 // CUENTAS POR COBRAR
            }
        ]
    },


    /* =========================================================
       PAGO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-18'),
            concepto: 'Pago de deuda pendiente a proveedor',
            tipo_origen: TipoOrigen.BANCO,
            total_debe: 8000,
            total_haber: 8000
        },

        detalles_asientos_contables: [
            {
                debe: 8000,
                haber: 0,
                asiento_id: 7,
                cuenta_id: 15 // PROVEEDORES
            },
            {
                debe: 0,
                haber: 8000,
                asiento_id: 7,
                cuenta_id: 5 // BANCOS
            }
        ]
    },


    /* =========================================================
       NÓMINA
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-20'),
            concepto: 'Pago de nómina',
            tipo_origen: TipoOrigen.NOMINA,
            total_debe: 5000,
            total_haber: 5000
        },

        detalles_asientos_contables: [
            {
                debe: 5000,
                haber: 0,
                asiento_id: 8,
                cuenta_id: 32 // GASTOS ADMINISTRATIVOS
            },
            {
                debe: 0,
                haber: 5000,
                asiento_id: 8,
                cuenta_id: 5 // BANCOS
            }
        ]
    },


    /* =========================================================
       ACTIVO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-22'),
            concepto: 'Compra de equipo de computación',
            tipo_origen: TipoOrigen.BANCO,
            total_debe: 18000,
            total_haber: 18000
        },

        detalles_asientos_contables: [
            {
                debe: 18000,
                haber: 0,
                asiento_id: 9,
                cuenta_id: 11 // EQUIPO DE COMPUTACIÓN
            },
            {
                debe: 0,
                haber: 18000,
                asiento_id: 9,
                cuenta_id: 5 // BANCOS
            }
        ]
    },


    /* =========================================================
       FINANCIAMIENTO
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-25'),
            concepto: 'Recepción de préstamo a largo plazo',
            tipo_origen: TipoOrigen.BANCO,
            total_debe: 50000,
            total_haber: 50000
        },

        detalles_asientos_contables: [
            {
                debe: 50000,
                haber: 0,
                asiento_id: 10,
                cuenta_id: 5 // BANCOS
            },
            {
                debe: 0,
                haber: 50000,
                asiento_id: 10,
                cuenta_id: 18 // PRÉSTAMOS A LARGO PLAZO
            }
        ]
    },


    /* =========================================================
       AJUSTE
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-01-31'),
            concepto: 'Ajuste contable del período',
            tipo_origen: TipoOrigen.AJUSTE,
            total_debe: 3000,
            total_haber: 3000
        },

        detalles_asientos_contables: [
            {
                debe: 3000,
                haber: 0,
                asiento_id: 11,
                cuenta_id: 32 // GASTOS ADMINISTRATIVOS
            },
            {
                debe: 0,
                haber: 3000,
                asiento_id: 11,
                cuenta_id: 15 // PROVEEDORES
            }
        ]
    },


    /* =========================================================
       CIERRE
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-12-31'),
            concepto: 'Asiento de cierre del período contable',
            tipo_origen: TipoOrigen.CIERRE,
            total_debe: 100000,
            total_haber: 100000
        },

        detalles_asientos_contables: [
            {
                debe: 60000,
                haber: 0,
                asiento_id: 12,
                cuenta_id: 26 // VENTAS
            },
            {
                debe: 20000,
                haber: 0,
                asiento_id: 12,
                cuenta_id: 32 // GASTOS ADMINISTRATIVOS
            },
            {
                debe: 20000,
                haber: 0,
                asiento_id: 12,
                cuenta_id: 29 // COSTO DE MERCANCÍAS VENDIDAS
            },
            {
                debe: 0,
                haber: 100000,
                asiento_id: 12,
                cuenta_id: 23 // UTILIDADES RETENIDAS
            }
        ]
    },


    /* =========================================================
       ASIENTO MANUAL
    ========================================================= */

    {
        asiento_contable: {
            usuario_id: 5,
            fecha: new Date('2026-09-22'),
            concepto: 'Registro contable manual',
            tipo_origen: TipoOrigen.AJUSTE,
            total_debe: 2500,
            total_haber: 2500
        },

        detalles_asientos_contables: [
            {
                debe: 1500,
                haber: 0,
                asiento_id: 13,
                cuenta_id: 10 // EQUIPO DE OFICINA
            },
            {
                debe: 1000,
                haber: 0,
                asiento_id: 13,
                cuenta_id: 32 // GASTOS ADMINISTRATIVOS
            },
            {
                debe: 0,
                haber: 2500,
                asiento_id: 13,
                cuenta_id: 5 // BANCOS
            }
        ]
    }

] as const;