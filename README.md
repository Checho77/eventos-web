# 🎟️ EventosApp - Proyecto Integrador (Bases de Datos / Web 1)

**Docente:** Jesús David Mejía Vergara  
**Institución:** Unidad Central del Valle del Cauca (UCEVA)  
**Proyecto:** Sistema de Gestión y Reserva de Eventos  
**Integrantes:**
* Sergio Álvarez ([@Checho77](https://github.com/Checho77))

---

## 📌 Descripción General

EventosApp es una aplicación web completa desarrollada con arquitectura desacoplada:
* **Backend:** API REST construida con **Node.js**, **Express**, **TypeScript** y **PostgreSQL** (`pg`), organizada estrictamente en capas:
  * **Routes:** Definición de endpoints y rutas HTTP.
  * **Controllers:** Recepción de peticiones HTTP, validación de parámetros y retorno de respuestas/códigos de estado.
  * **Services:** Lógica de negocio, reglas de validación y cálculos.
  * **Repositories:** Consultas directas a la base de datos PostgreSQL mediante transacciones y pool de conexiones.
* **Frontend:** Aplicación de cliente desarrollada en **Angular** con arquitectura basada en componentes independientes (*standalone*), navegación por roles y consumo de la API mediante `HttpClient`.
* **Base de Datos:** PostgreSQL 15 ejecutado sobre **Docker Compose**, con scripts automatizados de creación de tablas (`init.sql`) y carga de datos iniciales (`seed.sql`).

---

## 🛠️ Tecnologías Utilizadas

* **Base de Datos:** PostgreSQL 15.3, pgAdmin 4, Docker Compose
* **Backend:** Node.js, Express 5, TypeScript, pg (Pool de conexiones), JSON Web Tokens (JWT), Bcryptjs, Dotenv
* **Frontend:** Angular 20, Bootstrap 5, RxJS

---

## 📂 Estructura del Proyecto

```text
eventos-web/
├── Backend/
│   ├── docker-compose.yml        # Configuración de PostgreSQL y pgAdmin
│   ├── .env                      # Variables de entorno
│   ├── package.json
│   ├── src/
│   │   ├── config/               # Configuración de conexión DB y envs
│   │   ├── database/
│   │   │   ├── init.sql          # DDL: creación de tablas y restricciones
│   │   │   └── seed.sql          # DML: datos iniciales y usuarios de prueba
│   │   ├── middlewares/          # Autenticación y control de roles por JWT
│   │   ├── modules/
│   │   │   ├── auth/             # Login, registro y CRUD de usuarios
│   │   │   ├── localizacion/     # CRUD completo de Países, Deptos y Ciudades
│   │   │   ├── eventos/          # CRUD completo de Eventos (Agentes)
│   │   │   ├── reservas/         # CRUD completo de Reservas (Clientes)
│   │   │   └── reportes/         # Métricas y estadísticas SQL (Administrador)
│   │   ├── scripts/              # Comandos npm run db:init y db:seed
│   │   ├── app.ts                # Configuración de Express y middlewares
│   │   └── server.ts             # Punto de entrada y arranque del servidor
└── Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/       # Componentes visuales reutilizables (navbar, cards, badges)
    │   │   ├── models/           # Interfaces TypeScript (Evento, Reserva, Ubicación, etc.)
    │   │   ├── pages/            # Vistas por rol (Admin, Agente, Cliente, Auth)
    │   │   └── services/         # Servicios HTTP conectados a la API REST
    │   └── main.ts
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (versión 18 o superior)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) en ejecución

---

### 2. Poner en Marcha la Base de Datos (Docker)

1. Abre una terminal y dirígete a la carpeta `Backend`:
   ```bash
   cd Backend
   ```
2. Levanta los contenedores de PostgreSQL y pgAdmin:
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

Desde la carpeta `Backend`, instala las dependencias (si no las tienes) y ejecuta los scripts:
```bash
npm install
npm run db:init   # Crea todas las tablas e índices
npm run db:seed   # Carga ciudades, personas, eventos y reservas de prueba
```

---

### 4. Iniciar el Backend

Desde la carpeta `Backend`, inicia el servidor de desarrollo:
```bash
npm run dev
```
El servidor responderá en: **`http://localhost:3000`**  
Verificación de estado: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

### 5. Iniciar el Frontend (Angular)

1. Abre otra terminal y dirígete a la carpeta `Frontend`:
   ```bash
   cd Frontend
   ```
2. Instala las dependencias y corre la aplicación:
   ```bash
   npm install
   npm start
   ```
3. Abre tu navegador web en: **`http://localhost:4200`**

---

## 👥 Usuarios de Prueba

Todos los usuarios tienen la contraseña: **`123456`**

| Rol | Correo | Nombre | Descripción |
| :--- | :--- | :--- | :--- |
| **Cliente** | `laura.gomez@email.com` | Laura Gómez | Puede explorar eventos disponibles y crear/cancelar reservas. |
| **Cliente** | `carlos.ramirez@email.com` | Carlos Ramírez | Cliente con reservas previas. |
| **Agente** | `andres.cifuentes@eventos.com` | Andrés Cifuentes | Puede crear nuevos eventos, ver sus eventos y gestionar reservas. |
| **Administrador** | `admin@eventos.com` | Sergio Álvarez | Visualiza el Dashboard de reportes (ingresos, métricas y promedios). |

---

## 📡 Módulos y Operaciones CRUD Implementadas

Cada entidad cuenta con las 5 operaciones CRUD fundamentales:

| Módulo | Entidad | Métodos HTTP Disponibles |
| :--- | :--- | :--- |
| **Localización** | Países | `GET /api/paises`, `GET /api/paises/:id`, `POST /api/paises`, `PUT /api/paises/:id`, `DELETE /api/paises/:id` |
| **Localización** | Departamentos | `GET /api/departamentos`, `GET /api/departamentos/:id`, `POST /api/departamentos`, `PUT /api/departamentos/:id`, `DELETE /api/departamentos/:id` |
| **Localización** | Ciudades | `GET /api/ciudades`, `GET /api/ciudades/:id`, `POST /api/ciudades`, `PUT /api/ciudades/:id`, `DELETE /api/ciudades/:id` |
| **Auth / Personas** | Usuarios | `POST /api/auth/registro`, `POST /api/auth/login`, `GET /api/auth/me`, `GET /api/auth/usuarios`, `GET /api/auth/usuarios/:id`, `PUT /api/auth/usuarios/:id`, `DELETE /api/auth/usuarios/:id` |
| **Agentes** | Eventos | `GET /api/eventos`, `GET /api/eventos/:id`, `POST /api/eventos`, `PUT /api/eventos/:id`, `DELETE /api/eventos/:id` |
| **Clientes** | Reservas | `GET /api/reservas`, `GET /api/reservas/:id`, `POST /api/reservas`, `PUT /api/reservas/:id`, `DELETE /api/reservas/:id` |
| **Administradores** | Reportes | `GET /api/reportes/resumen`, `GET /api/reportes/ingresos-mensuales`, `GET /api/reportes/promedio-agente`, `GET /api/reportes/promedio-cliente`, `GET /api/reportes/reservas-evento-mes`, `GET /api/reportes/eventos-agente-ciudad` |
