# 🎟️ EventosApp - Proyecto Integrador (Bases de Datos / Web 1)

**Docente:** Jesús David Mejía Vergara  
**Institución:** Unidad Central del Valle del Cauca (UCEVA)  
**Proyecto:** Sistema de Gestión y Reserva de Eventos  
**Integrantes:**
* Sergio David Castro ([@Checho77](https://github.com/Checho77))

---

## 📌 Descripción General

EventosApp es una aplicación web desacoplada diseñada para la gestión, comercialización y reserva de eventos y espectáculos:
* **Backend:** API REST construida con **Node.js**, **Express**, **TypeScript** y **PostgreSQL** (`pg`), con control de acceso por **JWT** y roles (*cliente*, *agente*, *administrador*), organizada en 4 capas:
  * **Routes:** Definición de endpoints y rutas HTTP protegidas por middlewares.
  * **Controllers:** Recepción de peticiones HTTP, extracción de datos y gestión de respuestas con códigos de estado.
  * **Services:** Lógica de negocio, validaciones cruzadas (capacidad, estados) y cálculos.
  * **Models & Repositories:** Interfaces de datos (`*.model.ts`) y capa de persistencia (`*.repository.ts`) para consultas directas y transaccionales a PostgreSQL mediante pool de conexiones.
  * **Documentación interactiva:** Documentada con Swagger UI en `http://localhost:3000/api/docs`.
* **Frontend:** Desarrollada en **Angular 20** con componentes independientes (*standalone*), interceptor HTTP para JWT, Guards de autenticación y roles, formularios reactivos y consumo 100% real de la API REST (sin mocks).
* **Base de Datos:** PostgreSQL 15 ejecutado sobre **Docker Compose**, con scripts DDL de creación (`init.sql`) y DML de datos iniciales (`seed.sql`).

---

## 🛠️ Tecnologías Utilizadas

* **Base de Datos:** PostgreSQL 15.3, pgAdmin 4, Docker Compose
* **Backend:** Node.js, Express 5, TypeScript, pg (Pool de conexiones), JSON Web Tokens (JWT), Bcryptjs, Swagger UI
* **Frontend:** Angular 20, Bootstrap 5.3, RxJS, Guards e Interceptor HTTP

---

## 📂 Estructura del Proyecto

```text
eventos-web/
├── Backend/
│   ├── docker-compose.yml        # Servicio PostgreSQL (puerto 5433) y pgAdmin (puerto 8081)
│   ├── .env                      # Variables de entorno para conexión DB y secreto JWT
│   ├── .env.example              # Plantilla de variables de entorno
│   ├── package.json
│   ├── src/
│   │   ├── config/               # database.ts (Pool pg), envs.ts, swagger.ts
│   │   ├── database/
│   │   │   ├── init.sql          # DDL: creación de tablas, llaves foráneas e índices
│   │   │   └── seed.sql          # DML: datos de prueba de países, ciudades, personas, eventos y reservas
│   │   ├── middlewares/          # auth.middleware.ts: autenticar (JWT) y requiereRol (RBAC)
│   │   ├── modules/
│   │   │   ├── auth/             # Rutas, controlador, servicio y repositorio de Usuarios/Personas
│   │   │   ├── localizacion/     # CRUD completo de Países, Departamentos y Ciudades
│   │   │   ├── eventos/          # CRUD completo de Eventos (Agentes y Administradores)
│   │   │   ├── reservas/         # CRUD completo de Reservas (Clientes y Agentes)
│   │   │   ├── perfiles/         # CRUD propio para Clientes, Agentes y Administradores
│   │   │   └── reportes/         # Consultas estadísticas en SQL para el Administrador
│   │   ├── scripts/              # init-db.ts y seed-db.ts
│   │   ├── app.ts                # Configuración de Express, Swagger y manejadores de error
│   │   └── server.ts             # Punto de entrada que inicializa la conexión y escucha en puerto 3000
└── Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/       # navbar, footer, evento-card, estado-badge
    │   │   ├── guards/           # authGuard y rolGuard para protección de rutas
    │   │   ├── interceptors/     # authInterceptor (adjunta Bearer token a peticiones HTTP)
    │   │   ├── models/           # Interfaces TypeScript (Evento, Reserva, Ubicación, etc.)
    │   │   ├── pages/
    │   │   │   ├── auth/         # Login (con acceso rápido demo) y Registro (Cliente o Agente)
    │   │   │   ├── cliente/      # Eventos disponibles, Reservar evento, Mis reservas
    │   │   │   ├── agente/       # Registrar evento, Mis eventos (con edición), Administrar reservas
    │   │   │   └── admin/        # Dashboard de Reportes, Gestión de Usuarios/Perfiles y Localización (CRUD)
    │   │   └── services/         # Servicios HTTP conectados a la API REST (HttpClient)
    │   └── main.ts
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (versión 18 o superior)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) iniciado

---

### 2. Configurar y Levantar la Base de Datos (Docker)

1. Abre una terminal y dirígete a la carpeta `Backend`:
   ```bash
   cd Backend
   ```
2. Asegúrate de tener el archivo `.env`. Si no existe, créalo a partir de `.env.example`:
   ```bash
   # En Linux / Mac / Git Bash:
   cp .env.example .env

   # En Windows PowerShell:
   copy .env.example .env
   ```
   > [!TIP]
   > **Seguridad JWT:** El archivo `.env.example` incluye un secreto para facilitar la ejecución local y pruebas académicas. En un entorno de producción real, debe reemplazarse por una clave aleatoria de alta entropía.
3. Levanta los contenedores de Docker:
   ```bash
   docker compose up -d
   ```
   * **Host:** `localhost`
   * **Puerto PostgreSQL:** `5433`
   * **Usuario:** `user`
   * **Contraseña:** `123456`
   * **Base de Datos:** `proyecto-integrador-db`
   * **pgAdmin:** Disponible en [http://localhost:8081](http://localhost:8081) (`user@google.com` / `123456`)

---

### 3. Inicializar Tablas y Datos de Prueba (Init y Seed)

Desde la carpeta `Backend`, instala dependencias y ejecuta los scripts:
```bash
npm install
npm run db:init   # Ejecuta init.sql (crea tablas e índices)
npm run db:seed   # Ejecuta seed.sql (inserta datos iniciales)
```

---

### 4. Iniciar el Backend

Desde la carpeta `Backend`, puedes arrancar el servidor con cualquiera de los dos comandos:
```bash
npm run dev   # Inicia con recarga automática
# o también:
npm start     # Inicia el servidor directamente
```
* Servidor activo en: **`http://localhost:3000`**
* Documentación Swagger interactiva: **`http://localhost:3000/api/docs`**
* Verificación de estado: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

### 5. Iniciar el Frontend (Angular)

En otra terminal:
```bash
cd Frontend
npm install
npm start
```
Abre en el navegador: **`http://localhost:4200`**

---

## 👥 Usuarios de Prueba

Todos los usuarios tienen la contraseña: **`123456`**

| Rol | Correo | Nombre | Funcionalidades Habilitadas |
| :--- | :--- | :--- | :--- |
| **Cliente** | `laura.gomez@email.com` | Laura Gómez | Explorar eventos disponibles, reservar entradas, ver historial y cancelar reservas. |
| **Cliente** | `carlos.ramirez@email.com` | Carlos Ramírez | Cliente con reservas previas. |
| **Agente** | `andres.cifuentes@eventos.com` | Andrés Cifuentes | Registrar nuevos eventos, listar sus eventos, editar/cancelar/eliminar eventos y cambiar estados de reservas. |
| **Administrador** | `admin@eventos.com` | Sergio David Castro | Acceso total: Dashboard con reportes agregados, administración CRUD de Usuarios y Perfiles (`/admin/usuarios`) y Localización (`/admin/localizacion`). |

> [!NOTE]
> **Registro Público:** La interfaz de registro (`/auth/registro`) permite el autorregistro como **Cliente** o como **Agente** (solicitando sus años de experiencia profesional y asignando comisión comercial inicial). Los perfiles de **Administrador** no pueden autorregistrarse públicamente y son gestionados con acceso restringido desde la base de datos o por otro administrador en la pantalla de gestión de usuarios.

---

## 📡 Módulos y Operaciones CRUD de la API

| Módulo | Entidad | Métodos HTTP Disponibles | Permisos |
| :--- | :--- | :--- | :--- |
| **Localización** | Países | `GET /api/paises`, `GET /api/paises/:id`, `POST /api/paises`, `PUT /api/paises/:id`, `DELETE /api/paises/:id` | GET público, Modificaciones: Admin |
| **Localización** | Departamentos | `GET /api/departamentos`, `GET /api/departamentos/:id`, `POST /api/departamentos`, `PUT /api/departamentos/:id`, `DELETE /api/departamentos/:id` | GET público, Modificaciones: Admin |
| **Localización** | Ciudades | `GET /api/ciudades`, `GET /api/ciudades/:id`, `POST /api/ciudades`, `PUT /api/ciudades/:id`, `DELETE /api/ciudades/:id` | GET público, Modificaciones: Admin |
| **Auth** | Sesiones | `POST /api/auth/login`, `POST /api/auth/registro`, `GET /api/auth/me` | Login/Registro público, `/me` autenticado |
| **Personas** | Usuarios | `GET /api/auth/usuarios`, `GET /api/auth/usuarios/:id`, `PUT /api/auth/usuarios/:id`, `DELETE /api/auth/usuarios/:id` | Admin |
| **Perfiles** | Clientes | `GET /api/clientes`, `GET /api/clientes/:id`, `PUT /api/clientes/:id`, `DELETE /api/clientes/:id` | Admin |
| **Perfiles** | Agentes | `GET /api/agentes`, `GET /api/agentes/:id`, `PUT /api/agentes/:id`, `DELETE /api/agentes/:id` | Admin |
| **Perfiles** | Administradores | `GET /api/administradores`, `GET /api/administradores/:id`, `PUT /api/administradores/:id`, `DELETE /api/administradores/:id` | Admin |
| **Agentes** | Eventos | `GET /api/eventos`, `GET /api/eventos/:id`, `POST /api/eventos`, `PUT /api/eventos/:id`, `DELETE /api/eventos/:id` | GET público, Modificaciones: Agente/Admin |
| **Clientes** | Reservas | `GET /api/reservas`, `GET /api/reservas/:id`, `POST /api/reservas`, `PUT /api/reservas/:id`, `DELETE /api/reservas/:id` | Autenticado (Cliente/Agente/Admin) |
| **Administrador** | Reportes | `GET /api/reportes/resumen`, `/ingresos-mensuales`, `/promedio-agente`, `/promedio-cliente`, `/reservas-evento-mes`, `/eventos-agente-ciudad`, `/eventos-por-ubicacion` | Exclusivo Administrador |
