import { Routes } from '@angular/router';
import { authGuard, rolGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  /** Módulo de autenticación (público) */
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

  /** Módulo del cliente (requiere autenticación y rol cliente o administrador) */
  {
    path: 'cliente',
    canActivate: [authGuard, rolGuard],
    data: { roles: ['cliente', 'administrador'] },
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

  /** Módulo del agente (requiere autenticación y rol agente o administrador) */
  {
    path: 'agente',
    canActivate: [authGuard, rolGuard],
    data: { roles: ['agente', 'administrador'] },
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

  /** Módulo del administrador (exclusivo para rol administrador) */
  {
    path: 'admin',
    canActivate: [authGuard, rolGuard],
    data: { roles: ['administrador'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Reportes | EventosApp',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'localizacion',
        title: 'Localización | EventosApp',
        loadComponent: () => import('./pages/admin/localizacion/localizacion').then(m => m.AdminLocalizacion)
      }
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
