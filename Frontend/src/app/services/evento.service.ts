import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento, NuevoEvento } from '../models/evento';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/eventos';

  listar(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  /** Eventos que todavía se pueden reservar. */
  listarDisponibles(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(this.apiUrl)
      .pipe(
        map((eventos) =>
          eventos.filter(
            (evento) => evento.estado === 'Programado' || evento.estado === 'En Boletería'
          )
        )
      );
  }

  obtenerPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  listarPorAgente(agenteId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}?agenteId=${agenteId}`);
  }

  listarCancelados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}?estado=Cancelado`);
  }

  crear(evento: any): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  actualizar(id: number, evento: any): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
