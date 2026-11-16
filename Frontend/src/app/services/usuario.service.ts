import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/auth';

  private cargarSesion(): any {
    try {
      if (typeof localStorage === 'undefined') return null;
      const guardado = localStorage.getItem('usuario_actual');
      const token = localStorage.getItem('auth_token');
      if (token && guardado) {
        return JSON.parse(guardado);
      }
      return null;
    } catch {
      return null;
    }
  }

  readonly sesion = signal<any>(this.cargarSesion());
  readonly rol = computed<string | null>(() => this.sesion()?.rol ?? null);
  readonly autenticado = computed<boolean>(() => Boolean(this.sesion()));

  estaAutenticado(): boolean {
    return Boolean(this.sesion());
  }

  obtenerSesion(): any {
    return this.sesion();
  }

  obtenerRol(): string | null {
    return this.rol();
  }

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, password }).pipe(
      tap((res) => {
        if (res?.token && typeof localStorage !== 'undefined') {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('usuario_actual', JSON.stringify(res.usuario));
          this.sesion.set(res.usuario);
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
    this.sesion.set(null);
    this.router.navigate(['/auth/login']);
  }

  clienteActual(): any {
    const s = this.sesion();
    if (s) return s;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '', puntos: 0 };
  }

  agenteActual(): any {
    const s = this.sesion();
    if (s) return s;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '' };
  }

  administradorActual(): any {
    const s = this.sesion();
    if (s) return s;
    this.router.navigate(['/auth/login']);
    return { id: 0, nombreCompleto: '' };
  }

  // ---------- GESTIÓN CRUD DE PERFILES (ADMIN) ----------
  private apiPerfilesUrl = 'http://localhost:3000/api';

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPerfilesUrl}/clientes`);
  }
  actualizarCliente(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.apiPerfilesUrl}/clientes/${id}`, datos);
  }
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPerfilesUrl}/clientes/${id}`);
  }

  listarAgentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPerfilesUrl}/agentes`);
  }
  actualizarAgente(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.apiPerfilesUrl}/agentes/${id}`, datos);
  }
  eliminarAgente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPerfilesUrl}/agentes/${id}`);
  }

  listarAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPerfilesUrl}/administradores`);
  }
  actualizarAdministrador(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.apiPerfilesUrl}/administradores/${id}`, datos);
  }
  eliminarAdministrador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPerfilesUrl}/administradores/${id}`);
  }
}
