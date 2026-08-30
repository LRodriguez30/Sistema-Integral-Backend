# PASOS — Sistema Integral

Backend del Sistema Integral **PASOS**, una plataforma orientada a la gestión de diferentes áreas de una empresa desde un mismo sistema.

El proyecto está desarrollado con **NestJS**, **TypeScript** y **Supabase**, y utiliza una arquitectura modular para separar las funcionalidades de cada área.

---

## ¿Qué es PASOS?

PASOS busca integrar diferentes procesos de una empresa en una sola plataforma.

La idea es que cada área tenga su propio módulo, pero que estos puedan comunicarse entre sí cuando sea necesario.

Actualmente el proyecto cuenta principalmente con **Contalab**, mientras que **OrgLab** y otros módulos se encuentran en desarrollo o planificación.

```text
PASOS
│
├── Contalab
│   └── Contabilidad y finanzas
│
├── OrgLab
│   └── Gestión organizacional
│
├── Producción
│   └── Procesos productivos
│
├── Pedidos
│   └── Gestión de pedidos
│
└── Mercado
    └── Gestión comercial
```

---

## Módulos

| Módulo         | Descripción                                          | Estado        |
| -------------- | ---------------------------------------------------- | ------------- |
| **Contalab**   | Contabilidad, finanzas y operaciones administrativas | En desarrollo |
| **OrgLab**     | Estructura y organización empresarial                | Diseño        |
| **Producción** | Gestión de procesos productivos                      | Planificado   |
| **Pedidos**    | Gestión de pedidos y operaciones comerciales         | Planificado   |
| **Mercado**    | Gestión de actividades comerciales                   | Planificado   |

---

## Contalab

**Contalab** es actualmente el módulo con mayor avance dentro de PASOS.

Está orientado a la gestión administrativa, contable y financiera de la empresa.

Entre las funcionalidades contempladas se encuentran:

* Gestión de usuarios y roles.
* Gestión de personas.
* Catálogo de cuentas.
* Asientos contables.
* Clientes y proveedores.
* Productos y categorías.
* Pedidos.
* Facturación.
* Cobros.
* Compras.
* Pagos a proveedores.
* Empleados.
* Nómina.
* Gestión de sesiones mediante refresh tokens.

### Estructura general

```text
Contalab
│
├── Usuarios
│   ├── Roles
│   ├── Personas
│   └── Refresh Tokens
│
├── Contabilidad
│   ├── Catálogo de cuentas
│   ├── Asientos contables
│   └── Detalles de asientos
│
├── Ventas
│   ├── Clientes
│   ├── Pedidos
│   ├── Facturas
│   └── Cobros
│
├── Compras
│   ├── Proveedores
│   ├── Compras
│   └── Pagos
│
├── Productos
│   └── Categorías
│
└── Nómina
    ├── Empleados
    └── Nóminas
```

---

## OrgLab

**OrgLab** será el módulo encargado de la gestión organizacional.

La idea es representar la estructura de una empresa y las relaciones entre sus diferentes componentes.

Entre las entidades propuestas se encuentran:

* Organizaciones.
* Sedes.
* Unidades organizativas.
* Cargos.
* Personas.
* Asignaciones organizativas.
* Relaciones jerárquicas.
* Procesos.
* Etapas de procesos.

Por ejemplo:

```text
Organización
│
├── Gerencia General
│
├── Finanzas
│   ├── Contabilidad
│   └── Tesorería
│
├── Tecnología
│   ├── Desarrollo
│   └── Soporte
│
└── Operaciones
    ├── Producción
    └── Logística
```

Uno de los objetivos del módulo es poder representar la estructura organizacional y generar posteriormente información como organigramas y relaciones jerárquicas.

---

## Arquitectura

El backend está construido utilizando una arquitectura modular de NestJS.

```text
Angular
   │
   │ HTTP
   ▼
NestJS
   │
   ├── Auth
   │
   ├── Contalab
   │
   ├── OrgLab
   │
   └── Otros módulos
   │
   ▼
Supabase
   │
   └── PostgreSQL
```

Cada módulo mantiene sus propias responsabilidades para evitar que toda la lógica del sistema termine concentrada en una sola parte del backend.

---

## Base de datos

La base de datos utiliza **PostgreSQL mediante Supabase**.

La estructura está siendo organizada mediante schemas para separar los módulos.

```text
Supabase
│
├── public
│   └── Estructura actual del sistema integral
│
├── orglab
│   └── Estructura organizacional
│
├── contalab
    └── Estructura contable y financiera
```

La separación mediante schemas permite mantener organizadas las tablas de cada módulo sin necesidad de utilizar una base de datos independiente para cada uno.

> La estructura de schemas todavía se encuentra en proceso de organización y puede cambiar durante el desarrollo.

---

## Tecnologías

### Backend

* [NestJS](https://nestjs.com/)
* TypeScript
* Node.js

### Base de datos

* PostgreSQL
* Supabase
* Microsoft Auth

### API

* REST
* JSON

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_KEY=tu_service_key
```

La `SUPABASE_SERVICE_KEY` debe utilizarse únicamente en el backend y nunca debe exponerse en el frontend.

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
git clone <url-del-repositorio>

cd sistema-integral-backend

npm install
```

Iniciar el servidor en desarrollo:

```bash
npm run start:dev
```

Por defecto, la aplicación utiliza el puerto configurado en el proyecto.

---

## Estado actual

El proyecto se encuentra en desarrollo.

Actualmente **Contalab** cuenta con la mayor parte de la estructura de base de datos y funcionalidades contables, mientras que **OrgLab** se encuentra en etapa de diseño y los módulos de Producción, Pedidos y Mercado forman parte del desarrollo previsto para el sistema integral.

La estructura del sistema puede cambiar conforme se definan nuevos requerimientos y se integren los diferentes módulos.

---