# EventosApp – Proyecto Integrador (Avance Web 1)

Aplicación web para la **gestión de eventos y espectáculos** (reservas, agentes, clientes y reportes),
desarrollada como avance del Proyecto Integrador de **Programación en Ambiente Web I**
y **Bases de Datos** – Unidad Central del Valle del Cauca (UCEVA).

> **Estado del avance:** estructura inicial del *frontend*. Todavía no existe backend,
> por lo que la información se muestra con **datos mockeados** y los botones/formularios
> son solo visuales.

## Tecnologías

- Angular 20 (componentes *standalone*, `@for` / `@if`, rutas con `loadComponent`)
- TypeScript (interfaces, types, utility types)
- HTML5
- SCSS
- Bootstrap 5.3 (cargado por CDN en `src/index.html`)

## Requisitos

- Node.js `^20.19`, `^22.12` o `^24`
- Angular CLI 20 (`npm install -g @angular/cli`)

## Instalación y ejecución

```bash
git clone https://github.com/Checho77/eventos-web.git
cd eventos-web
npm install
ng serve
```

Abrir `http://localhost:4200`. Se requiere conexión a internet para cargar Bootstrap desde el CDN.

## Páginas y rutas

| Módulo | Página | Ruta |
|---|---|---|
| Auth | Inicio de sesión | `/auth/login` |
| Auth | Registro | `/auth/registro` |
| Cliente | Eventos disponibles | `/cliente/eventos` |
| Cliente | Realizar reserva | `/cliente/eventos/:id/reservar` |
| Cliente | Mis reservas con su estado | `/cliente/mis-reservas` |
| Agente | Registrar evento | `/agente/registrar-evento` |
| Agente | Eventos registrados | `/agente/eventos` |
| Agente | Administrar reservas | `/agente/reservas` |
| Administrador | Reportes (dashboard) | `/admin/dashboard` |

La barra de navegación superior permite ir a todas las páginas, agrupadas por módulo.

## Estructura del proyecto

```
src/app/
├── components/     → navbar, footer, evento-card, estado-badge (reutilizables)
├── pages/          → una carpeta por módulo (auth, cliente, agente, admin)
├── models/         → interfaces y types (Evento, Reserva, Persona, estados, reportes)
├── mocks/          → datos de prueba (ciudades, personas, eventos, reservas, reportes)
├── services/       → servicios que entregan los datos mock
├── app.routes.ts   → definición de rutas
└── app.config.ts   → configuración global
```

## Datos mockeados y servicios

Los servicios (`EventoService`, `ReservaService`, `UsuarioService`, `UbicacionService`,
`ReporteService`) devuelven los datos de la carpeta `mocks/` como `Observable` y las páginas
los muestran con `async` y `@for`. Cuando exista el backend solo se cambiará la fuente de datos
dentro de cada servicio por `HttpClient`, sin modificar las páginas.

## Reportes del dashboard

Reporte general de registros, ingresos por mes (gráfica de barras), promedio de ingresos por
agente y por cliente, reservas por evento y mes, eventos por agente y ciudad, eventos por
país/departamento/ciudad, historial de reservas por cliente, y reservas y eventos cancelados con su causa.

## Estándar de commits

Se usa **Conventional Commits** con mensajes descriptivos en español:

| Tipo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad, página o componente |
| `fix:` | Corrección de errores |
| `style:` | Cambios de estilos (SCSS) o formato |
| `refactor:` | Reorganización de código sin cambiar el comportamiento |
| `docs:` | Documentación (README) |
| `chore:` | Configuración y tareas de mantenimiento |

Ejemplo: `feat: agregar página de eventos disponibles del cliente`

## Alcance de este avance

**Incluye:** páginas y componentes, enrutamiento, navegación, HTML + SCSS, Bootstrap, diseño responsive,
servicios y renderizado dinámico con mocks.

**No incluye todavía:** backend, base de datos PostgreSQL, autenticación real, lógica de formularios,
creación de reservas ni actualización real de estados.