import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ubicacion';

export interface Pais {
  id: number;
  nombre: string;
}

export interface Departamento {
  id: number;
  nombre: string;
  paisId: number;
  paisNombre?: string;
}

@Injectable({ providedIn: 'root' })
export class UbicacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  // ---------- Países ----------
  listarPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}/paises`);
  }
  crearPais(nombre: string): Observable<Pais> {
    return this.http.post<Pais>(`${this.apiUrl}/paises`, { nombre });
  }
  actualizarPais(id: number, nombre: string): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/paises/${id}`, { nombre });
  }
  eliminarPais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/paises/${id}`);
  }

  // ---------- Departamentos ----------
  listarDepartamentos(paisId?: number): Observable<Departamento[]> {
    const url = paisId
      ? `${this.apiUrl}/paises/${paisId}/departamentos`
      : `${this.apiUrl}/departamentos`;
    return this.http.get<Departamento[]>(url);
  }
  crearDepartamento(nombre: string, paisId: number): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiUrl}/departamentos`, { nombre, paisId });
  }
  actualizarDepartamento(id: number, nombre: string, paisId: number): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/departamentos/${id}`, { nombre, paisId });
  }
  eliminarDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/departamentos/${id}`);
  }

  // ---------- Ciudades ----------
  listarCiudades(departamentoId?: number): Observable<Ciudad[]> {
    const url = departamentoId
      ? `${this.apiUrl}/departamentos/${departamentoId}/ciudades`
      : `${this.apiUrl}/ciudades`;
    return this.http.get<Ciudad[]>(url);
  }
  obtenerCiudadPorId(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.apiUrl}/ciudades/${id}`);
  }
  crearCiudad(nombre: string, departamentoId: number): Observable<Ciudad> {
    return this.http.post<Ciudad>(`${this.apiUrl}/ciudades`, { nombre, departamentoId });
  }
  actualizarCiudad(id: number, nombre: string, departamentoId: number): Observable<Ciudad> {
    return this.http.put<Ciudad>(`${this.apiUrl}/ciudades/${id}`, { nombre, departamentoId });
  }
  eliminarCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ciudades/${id}`);
  }
}
