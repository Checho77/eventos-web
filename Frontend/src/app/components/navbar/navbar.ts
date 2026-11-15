import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type EnlaceNav = { texto: string; ruta: string };
type ModuloNav = { titulo: string; enlaces: EnlaceNav[] };

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  modulos: ModuloNav[] = [
    {
      titulo: 'Autenticación',
      enlaces: [
        { texto: 'Iniciar sesión', ruta: '/auth/login' },
        { texto: 'Registro', ruta: '/auth/registro' }
      ]
    },
    {
      titulo: 'Cliente',
      enlaces: [
        { texto: 'Eventos disponibles', ruta: '/cliente/eventos' },
        { texto: 'Mis reservas', ruta: '/cliente/mis-reservas' }
      ]
    },
    {
      titulo: 'Agente',
      enlaces: [
        { texto: 'Registrar evento', ruta: '/agente/registrar-evento' },
        { texto: 'Eventos registrados', ruta: '/agente/eventos' },
        { texto: 'Administrar reservas', ruta: '/agente/reservas' }
      ]
    },
    {
      titulo: 'Administrador',
      enlaces: [
        { texto: 'Reportes', ruta: '/admin/dashboard' }
      ]
    }
  ];
}
