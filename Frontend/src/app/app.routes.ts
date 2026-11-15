import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  /** Módulo de autenticación */
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        title: 'Iniciar sesión | EventosApp',
        loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)
      },
      {
        path: 'registro',
        title: 'Registro | EventosApp',
        loadComponent: () => import('./pages/auth/registro/registro').then(m => m.Registro)
      }
    ]
  },

  /** Módulo del cliente */
  {
    path: 'cliente',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'eventos' },
      {
        path: 'eventos',
        title: 'Eventos disponibles | EventosApp',
        loadComponent: () => import('./pages/cliente/eventos/eventos').then(m => m.Eventos)
      },
      {
        path: 'eventos/:id/reservar',
        title: 'Reservar evento | EventosApp',
        loadComponent: () => import('./pages/cliente/reservar-evento/reservar-evento').then(m => m.ReservarEvento)
      },
      {
        path: 'mis-reservas',
        title: 'Mis reservas | EventosApp',
        loadComponent: () => import('./pages/cliente/mis-reservas/mis-reservas').then(m => m.MisReservas)
      }
    ]
  },

  /** Módulo del agente */
  {
    path: 'agente',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'eventos' },
      {
        path: 'registrar-evento',
        title: 'Registrar evento | EventosApp',
        loadComponent: () => import('./pages/agente/registrar-evento/registrar-evento').then(m => m.RegistrarEvento)
      },
      {
        path: 'eventos',
        title: 'Eventos registrados | EventosApp',
        loadComponent: () => import('./pages/agente/mis-eventos/mis-eventos').then(m => m.MisEventos)
      },
      {
        path: 'reservas',
        title: 'Administrar reservas | EventosApp',
        loadComponent: () => import('./pages/agente/administrar-reservas/administrar-reservas').then(m => m.AdministrarReservas)
      }
    ]
  },

  /** Módulo del administrador */
  {
    path: 'admin',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Reportes | EventosApp',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
      }
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
