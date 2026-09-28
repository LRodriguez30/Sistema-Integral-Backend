export const plantillaDetallesAsientos = [

    /* =========================================================
       APERTURA — asiento_id: 1
       Aporte de capital inicial
       
       Bancos aumenta  → DEBE
       Capital social  → HABER
    ========================================================= */

    {
        asiento_id: 1,
        cuenta_id: 5, // BANCOS
        debe: 10000,
        haber: 0
    },
    {
        asiento_id: 1,
        cuenta_id: 21, // CAPITAL SOCIAL
        debe: 0,
        haber: 10000
    },


    /* =========================================================
       COMPRA — asiento_id: 2
       Compra de mercadería al contado
       
       Inventarios aumenta → DEBE
       Bancos disminuye    → HABER
    ========================================================= */

    {
        asiento_id: 2,
        cuenta_id: 7, // INVENTARIOS
        debe: 10000,
        haber: 0
    },
    {
        asiento_id: 2,
        cuenta_id: 5, // BANCOS
        debe: 0,
        haber: 10000
    },


    /* =========================================================
       COMPRA A CRÉDITO — asiento_id: 3
       Compra de mercadería a crédito
       
       Inventarios aumenta → DEBE
       Proveedores aumenta → HABER
    ========================================================= */

    {
        asiento_id: 3,
        cuenta_id: 7, // INVENTARIOS
        debe: 15000,
        haber: 0
    },
    {
        asiento_id: 3,
        cuenta_id: 15, // PROVEEDORES
        debe: 0,
        haber: 15000
    },


    /* =========================================================
       VENTA — asiento_id: 4
       Venta de mercadería al contado
       
       Bancos aumenta → DEBE
       Ventas aumenta → HABER
    ========================================================= */

    {
        asiento_id: 4,
        cuenta_id: 5, // BANCOS
        debe: 20000,
        haber: 0
    },
    {
        asiento_id: 4,
        cuenta_id: 26, // VENTAS
        debe: 0,
        haber: 20000
    },


    /* =========================================================
       VENTA A CRÉDITO — asiento_id: 5
       Venta de mercadería a crédito
       
       Cuentas por cobrar aumenta → DEBE
       Ventas aumenta             → HABER
    ========================================================= */

    {
        asiento_id: 5,
        cuenta_id: 6, // CUENTAS POR COBRAR
        debe: 30000,
        haber: 0
    },
    {
        asiento_id: 5,
        cuenta_id: 26, // VENTAS
        debe: 0,
        haber: 30000
    },


    /* =========================================================
       COBRO — asiento_id: 6
       Cobro de cuenta pendiente a cliente
       
       Bancos aumenta             → DEBE
       Cuentas por cobrar baja   → HABER
    ========================================================= */

    {
        asiento_id: 6,
        cuenta_id: 5, // BANCOS
        debe: 12000,
        haber: 0
    },
    {
        asiento_id: 6,
        cuenta_id: 6, // CUENTAS POR COBRAR
        debe: 0,
        haber: 12000
    },


    /* =========================================================
       PAGO — asiento_id: 7
       Pago de deuda pendiente a proveedor
       
       Proveedores disminuye → DEBE
       Bancos disminuye      → HABER
    ========================================================= */

    {
        asiento_id: 7,
        cuenta_id: 15, // PROVEEDORES
        debe: 8000,
        haber: 0
    },
    {
        asiento_id: 7,
        cuenta_id: 5, // BANCOS
        debe: 0,
        haber: 8000
    },


    /* =========================================================
       GASTO — asiento_id: 8
       Pago de gasto administrativo
       
       Gasto administrativo aumenta → DEBE
       Bancos disminuye              → HABER
    ========================================================= */

    {
        asiento_id: 8,
        cuenta_id: 32, // GASTOS ADMINISTRATIVOS
        debe: 5000,
        haber: 0
    },
    {
        asiento_id: 8,
        cuenta_id: 5, // BANCOS
        debe: 0,
        haber: 5000
    },


    /* =========================================================
       ACTIVO — asiento_id: 9
       Compra de equipo de computación
       
       Equipo de computación aumenta → DEBE
       Bancos disminuye              → HABER
    ========================================================= */

    {
        asiento_id: 9,
        cuenta_id: 11, // EQUIPO DE COMPUTACIÓN
        debe: 18000,
        haber: 0
    },
    {
        asiento_id: 9,
        cuenta_id: 5, // BANCOS
        debe: 0,
        haber: 18000
    },


    /* =========================================================
       FINANCIAMIENTO — asiento_id: 10
       Recepción de préstamo a largo plazo
       
       Bancos aumenta               → DEBE
       Préstamo a largo plazo       → HABER
    ========================================================= */

    {
        asiento_id: 10,
        cuenta_id: 5, // BANCOS
        debe: 50000,
        haber: 0
    },
    {
        asiento_id: 10,
        cuenta_id: 18, // PRÉSTAMOS A LARGO PLAZO
        debe: 0,
        haber: 50000
    },


    /* =========================================================
       AJUSTE — asiento_id: 11
       Ajuste contable del período
       
       Gasto administrativo aumenta → DEBE
       Proveedores aumenta           → HABER
    ========================================================= */

    {
        asiento_id: 11,
        cuenta_id: 32, // GASTOS ADMINISTRATIVOS
        debe: 3000,
        haber: 0
    },
    {
        asiento_id: 11,
        cuenta_id: 15, // PROVEEDORES
        debe: 0,
        haber: 3000
    },


    /* =========================================================
       CIERRE — asiento_id: 12
       Asiento de cierre del período contable
       
       Ventas                    → DEBE
       Gastos administrativos    → DEBE
       Costo de ventas           → DEBE
       Utilidades retenidas      → HABER
    ========================================================= */

    {
        asiento_id: 12,
        cuenta_id: 26, // VENTAS
        debe: 60000,
        haber: 0
    },
    {
        asiento_id: 12,
        cuenta_id: 32, // GASTOS ADMINISTRATIVOS
        debe: 20000,
        haber: 0
    },
    {
        asiento_id: 12,
        cuenta_id: 29, // COSTO DE MERCANCÍAS VENDIDAS
        debe: 20000,
        haber: 0
    },
    {
        asiento_id: 12,
        cuenta_id: 23, // UTILIDADES RETENIDAS
        debe: 0,
        haber: 100000
    },


    /* =========================================================
       ASIENTO MANUAL — asiento_id: 13
       Registro contable manual
       
       Equipo de oficina          → DEBE
       Gastos administrativos     → DEBE
       Bancos                     → HABER
    ========================================================= */

    {
        asiento_id: 13,
        cuenta_id: 10, // EQUIPO DE OFICINA
        debe: 1500,
        haber: 0
    },
    {
        asiento_id: 13,
        cuenta_id: 32, // GASTOS ADMINISTRATIVOS
        debe: 1000,
        haber: 0
    },
    {
        asiento_id: 13,
        cuenta_id: 5, // BANCOS
        debe: 0,
        haber: 2500
    }

] as const;