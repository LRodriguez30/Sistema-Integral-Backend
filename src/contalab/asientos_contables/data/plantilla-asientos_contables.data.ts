export const plantillaAsientosContables = [

    /* =========================================================
       APERTURA
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-01',
        concepto: 'Aporte de capital inicial',
        tipo_origen: 'APERTURA',
        total_debe: 10000,
        total_haber: 10000
    },


    /* =========================================================
       COMPRA
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-05',
        concepto: 'Compra de mercadería al contado',
        tipo_origen: 'COMPRA',
        total_debe: 10000,
        total_haber: 10000
    },


    /* =========================================================
       COMPRA A CRÉDITO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-07',
        concepto: 'Compra de mercadería a crédito',
        tipo_origen: 'COMPRA',
        total_debe: 15000,
        total_haber: 15000
    },


    /* =========================================================
       VENTA
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-10',
        concepto: 'Venta de mercadería al contado',
        tipo_origen: 'VENTA',
        total_debe: 20000,
        total_haber: 20000
    },


    /* =========================================================
       VENTA A CRÉDITO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-12',
        concepto: 'Venta de mercadería a crédito',
        tipo_origen: 'VENTA',
        total_debe: 30000,
        total_haber: 30000
    },


    /* =========================================================
       COBRO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-15',
        concepto: 'Cobro de cuenta pendiente a cliente',
        tipo_origen: 'CAJA',
        total_debe: 12000,
        total_haber: 12000
    },


    /* =========================================================
       PAGO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-18',
        concepto: 'Pago de deuda pendiente a proveedor',
        tipo_origen: 'CAJA',
        total_debe: 8000,
        total_haber: 8000
    },


    /* =========================================================
       GASTO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-20',
        concepto: 'Pago de gasto administrativo',
        tipo_origen: 'CAJA',
        total_debe: 5000,
        total_haber: 5000
    },


    /* =========================================================
       ACTIVO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-22',
        concepto: 'Compra de equipo de computación',
        tipo_origen: 'COMPRA',
        total_debe: 18000,
        total_haber: 18000
    },


    /* =========================================================
       FINANCIAMIENTO
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-25',
        concepto: 'Recepción de préstamo a largo plazo',
        tipo_origen: 'BANCO',
        total_debe: 50000,
        total_haber: 50000
    },


    /* =========================================================
       AJUSTE
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-01-31',
        concepto: 'Ajuste contable del período',
        tipo_origen: 'AJUSTE',
        total_debe: 3000,
        total_haber: 3000
    },


    /* =========================================================
       CIERRE
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-12-31',
        concepto: 'Asiento de cierre del período contable',
        tipo_origen: 'CIERRE',
        total_debe: 100000,
        total_haber: 100000
    },


    /* =========================================================
       ASIENTO MANUAL
    ========================================================= */

    {
        usuario_id: 5,
        fecha: '2026-09-22',
        concepto: 'Registro contable manual',
        tipo_origen: 'AJUSTE',
        total_debe: 2500,
        total_haber: 2500

    }

] as const;