import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Administrador, Agente, Cliente } from '../models/persona';

const CIUDAD_DEFAULT = {
  id: 1,
  nombre: 'Cali',
  departamento: 'Valle del Cauca',
  pais: 'Colombia',
};

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  private usuarioLogueado: any = null;

  constructor() {
    try {
      const guardado = typeof localStorage !== 'undefined' ? localStorage.getItem('usuario_actual') : null;
      if (guardado) {
        this.usuarioLogueado = JSON.parse(guardado);
      }
    } catch {
      this.usuarioLogueado = null;
    }
  }

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, password }).pipe(
      tap((res) => {
        if (res?.token && typeof localStorage !== 'undefined') {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('usuario_actual', JSON.stringify(res.usuario));
          this.usuarioLogueado = res.usuario;
        }
      })
    );
  }

  registro(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, datos);
  }

  cerrarSesion(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('usuario_actual');
    }
    this.usuarioLogueado = null;
  }

  obtenerSesion(): any {
    return this.usuarioLogueado;
  }

  clienteActual(): Cliente {
    if (this.usuarioLogueado && this.usuarioLogueado.rol === 'cliente') {
      return {
        id: this.usuarioLogueado.id,
        identificacion: this.usuarioLogueado.identificacion ?? '1010101010',
        nombreCompleto: this.usuarioLogueado.nombreCompleto,
        correo: this.usuarioLogueado.correo,
        direccion: this.usuarioLogueado.direccion ?? 'Carrera 5 # 10-20',
        ciudad: this.usuarioLogueado.ciudad ?? CIUDAD_DEFAULT,
        telefonos: this.usuarioLogueado.telefonos ?? ['3001234567'],
        puntos: this.usuarioLogueado.puntos ?? 120,
        visualizaPublicidad: true,
      };
    }
    // Usuario por defecto de base de datos (Laura Gómez, id: 1)
    return {
      id: 1,
      identificacion: '1010101010',
      nombreCompleto: 'Laura Gómez',
      correo: 'laura.gomez@email.com',
      direccion: 'Carrera 5 # 10-20',
      ciudad: CIUDAD_DEFAULT,
      telefonos: ['3001234567', '3157654321'],
      puntos: 120,
      visualizaPublicidad: true,
    };
  }

  agenteActual(): Agente {
    if (this.usuarioLogueado && this.usuarioLogueado.rol === 'agente') {
      return {
        id: this.usuarioLogueado.id,
        identificacion: this.usuarioLogueado.identificacion ?? '1144556677',
        nombreCompleto: this.usuarioLogueado.nombreCompleto,
        correo: this.usuarioLogueado.correo,
        direccion: this.usuarioLogueado.direccion ?? 'Calle 5 # 38-10',
        ciudad: this.usuarioLogueado.ciudad ?? CIUDAD_DEFAULT,
        telefonos: this.usuarioLogueado.telefonos ?? ['3004445566'],
        comision: this.usuarioLogueado.comision ?? 8,
        experiencia: this.usuarioLogueado.experiencia ?? 5,
      };
    }
    // Agente por defecto de base de datos (Andrés Cifuentes, id: 4)
    return {
      id: 4,
      identificacion: '1144556677',
      nombreCompleto: 'Andrés Cifuentes',
      correo: 'andres.cifuentes@eventos.com',
      direccion: 'Calle 5 # 38-10',
      ciudad: CIUDAD_DEFAULT,
      telefonos: ['3004445566'],
      comision: 8,
      experiencia: 5,
    };
  }

  administradorActual(): Administrador {
    if (this.usuarioLogueado && this.usuarioLogueado.rol === 'administrador') {
      return {
        id: this.usuarioLogueado.id,
        identificacion: this.usuarioLogueado.identificacion ?? '1122334455',
        nombreCompleto: this.usuarioLogueado.nombreCompleto,
        correo: this.usuarioLogueado.correo,
        direccion: this.usuarioLogueado.direccion ?? 'Calle 10 # 4-20',
        ciudad: this.usuarioLogueado.ciudad ?? CIUDAD_DEFAULT,
        telefonos: this.usuarioLogueado.telefonos ?? ['3012223344'],
        salario: this.usuarioLogueado.salario ?? 4500000,
        horario: this.usuarioLogueado.horario ?? 'Lunes a viernes, 8:00 a.m. a 5:00 p.m.',
      };
    }
    // Administrador por defecto de base de datos (Sergio Álvarez, id: 6)
    return {
      id: 6,
      identificacion: '1122334455',
      nombreCompleto: 'Sergio Álvarez',
      correo: 'admin@eventos.com',
      direccion: 'Calle 10 # 4-20',
      ciudad: CIUDAD_DEFAULT,
      telefonos: ['3012223344'],
      salario: 4500000,
      horario: 'Lunes a viernes, 8:00 a.m. a 5:00 p.m.',
    };
  }
}
