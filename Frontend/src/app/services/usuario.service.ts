import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private router = inject(Router);
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

  estaAutenticado(): boolean {
    if (typeof localStorage === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return Boolean(token && this.usuarioLogueado);
  }

  obtenerSesion(): any {
    return this.usuarioLogueado;
  }

  obtenerRol(): string | null {
    return this.usuarioLogueado?.rol ?? null;
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
    this.router.navigate(['/auth/login']);
  }

  clienteActual(): any {
    if (this.usuarioLogueado) return this.usuarioLogueado;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '', puntos: 0 };
  }

  agenteActual(): any {
    if (this.usuarioLogueado) return this.usuarioLogueado;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '' };
  }

  administradorActual(): any {
    if (this.usuarioLogueado) return this.usuarioLogueado;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '' };
  }
}
