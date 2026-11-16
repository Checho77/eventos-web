import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

type EnlaceNav = { texto: string; ruta: string };
type ModuloNav = { titulo: string; enlaces: EnlaceNav[] };

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  usuarioService = inject(UsuarioService);

  readonly modulos = computed<ModuloNav[]>(() => {
    const rol = this.usuarioService.rol();

    // 1. Si no hay sesión iniciada, solo se muestran opciones de acceso
    if (!rol) {
      return [
        {
          titulo: 'Autenticación',
          enlaces: [
            { texto: 'Iniciar sesión', ruta: '/auth/login' },
            { texto: 'Crear cuenta (Registro)', ruta: '/auth/registro' }
          ]
        }
      ];
    }

    // 2. Si el rol es cliente: solo opciones del cliente
    if (rol === 'cliente') {
      return [
        {
          titulo: 'Módulo Cliente',
          enlaces: [
            { texto: 'Eventos disponibles', ruta: '/cliente/eventos' },
            { texto: 'Mis reservas', ruta: '/cliente/mis-reservas' }
          ]
        }
      ];
    }

    // 3. Si el rol es agente: solo opciones del agente
    if (rol === 'agente') {
      return [
        {
          titulo: 'Módulo Agente',
          enlaces: [
            { texto: 'Eventos registrados', ruta: '/agente/eventos' },
            { texto: 'Registrar nuevo evento', ruta: '/agente/registrar-evento' },
            { texto: 'Administrar reservas', ruta: '/agente/reservas' }
          ]
        }
      ];
    }

    // 4. Si el rol es administrador: administración completa y supervisión
    if (rol === 'administrador') {
      return [
        {
          titulo: 'Administración',
          enlaces: [
            { texto: 'Dashboard y Reportes', ruta: '/admin/dashboard' },
            { texto: 'Usuarios y Perfiles', ruta: '/admin/usuarios' },
            { texto: 'Localización (Países / Deptos / Ciudades)', ruta: '/admin/localizacion' }
          ]
        },
        {
          titulo: 'Supervisión',
          enlaces: [
            { texto: 'Catálogo de Eventos', ruta: '/cliente/eventos' },
            { texto: 'Gestión de Reservas', ruta: '/agente/reservas' }
          ]
        }
      ];
    }

    return [];
  });

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
  }
}
