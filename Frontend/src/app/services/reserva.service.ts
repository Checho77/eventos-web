import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistorialCliente, Reserva, ReservaDetalle } from '../models/reserva';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/reservas';

  listarTodas(): Observable<ReservaDetalle[]> {
    return this.http.get<ReservaDetalle[]>(this.apiUrl);
  }

  listarPorCliente(clienteId: number): Observable<ReservaDetalle[]> {
    return this.http.get<ReservaDetalle[]>(`${this.apiUrl}?clienteId=${clienteId}`);
  }

  listarCanceladas(): Observable<ReservaDetalle[]> {
    return this.http.get<ReservaDetalle[]>(`${this.apiUrl}?estado=Cancelada`);
  }

  obtenerPorId(id: number): Observable<ReservaDetalle> {
    return this.http.get<ReservaDetalle>(`${this.apiUrl}/${id}`);
  }

  crear(datos: {
    clienteId: number;
    eventoId: number;
    numeroEntradas: number;
    observaciones?: string;
  }): Observable<ReservaDetalle> {
    return this.http.post<ReservaDetalle>(this.apiUrl, datos);
  }

  actualizar(
    id: number,
    datos: { estado?: string; observaciones?: string; causaCancelacion?: string }
  ): Observable<ReservaDetalle> {
    return this.http.put<ReservaDetalle>(`${this.apiUrl}/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  historialPorCliente(): Observable<HistorialCliente[]> {
    return this.listarTodas().pipe(
      map((reservas) => {
        const clientesMap = new Map<number, HistorialCliente>();
        for (const res of reservas) {
          if (!clientesMap.has(res.clienteId)) {
            clientesMap.set(res.clienteId, {
              cliente: res.cliente,
              reservas: [],
            });
          }
          clientesMap.get(res.clienteId)!.reservas.push(res);
        }
        return Array.from(clientesMap.values());
      })
    );
  }
}
