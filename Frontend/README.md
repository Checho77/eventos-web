# EventosApp – Frontend Angular (Proyecto Integrador - Entrega Final)

Aplicación web para la **gestión de eventos y espectáculos** (reservas, agentes, clientes y reportes),
desarrollada para la Entrega Final del Proyecto Integrador de **Programación en Ambiente Web I**
y **Bases de Datos** – Unidad Central del Valle del Cauca (UCEVA).

> **Estado de la entrega final:** Frontend completamente integrado con la API REST del backend
> en Node.js y PostgreSQL mediante `HttpClient`. Todos los datos mockeados fueron eliminados
> y las vistas/formularios realizan operaciones reales sobre la base de datos.

## Tecnologías

- Angular 20 (componentes *standalone*, `@for` / `@if`, rutas con `loadComponent`)
- TypeScript (interfaces, types, utility types)
- RxJS (consumo reactivo de observables HTTP)
- Bootstrap 5.3 (estilos y componentes responsivos)

## Requisitos

- Node.js `^20.19`, `^22.12` o `^24`
- Backend en ejecución en `http://localhost:3000`

## Instalación y ejecución

```bash
cd Frontend
npm install
npm start
```

Abrir [http://localhost:4200](http://localhost:4200).

## Páginas y rutas integradas

| Módulo | Página | Ruta | Descripción |
|---|---|---|---|
| Auth | Inicio de sesión | `/auth/login` | Autenticación real con JWT y Bcrypt contra PostgreSQL |
| Auth | Registro | `/auth/registro` | Registro de nuevos clientes/agentes en PostgreSQL |
| Cliente | Eventos disponibles | `/cliente/eventos` | Consulta de eventos activos desde la API |
| Cliente | Realizar reserva | `/cliente/eventos/:id/reservar` | Creación de reserva conectada al backend |
| Cliente | Mis reservas | `/cliente/mis-reservas` | Consulta y cancelación de reservas en tiempo real |
| Agente | Registrar evento | `/agente/registrar-evento` | Creación de nuevos eventos en la base de datos |
| Agente | Eventos registrados | `/agente/eventos` | Consulta, cancelación y eliminación de eventos |
| Agente | Administrar reservas | `/agente/reservas` | Actualización de estado de reservas |
| Administrador | Reportes (dashboard) | `/admin/dashboard` | Métricas y estadísticas calculadas por SQL |

## Estructura del Frontend

```
src/app/
├── components/     → navbar, footer, evento-card, estado-badge (reutilizables)
├── pages/          → una carpeta por módulo (auth, cliente, agente, admin)
├── models/         → interfaces y types (Evento, Reserva, Persona, estados, reportes)
├── services/       → servicios HTTP que consumen la API REST (HttpClient)
├── app.routes.ts   → definición de rutas
└── app.config.ts   → configuración global con provideHttpClient()
```
