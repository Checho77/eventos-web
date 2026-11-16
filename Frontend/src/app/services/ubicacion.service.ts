import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ubicacion';

@Injectable({ providedIn: 'root' })
export class UbicacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  listarCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.apiUrl}/ciudades`);
  }

  obtenerCiudadPorId(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.apiUrl}/ciudades/${id}`);
  }
}
