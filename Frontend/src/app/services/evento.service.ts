import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Evento } from '../models/evento';
import { EVENTOS } from '../mocks/eventos.mock';

@Injectable({ providedIn: 'root' })
export class EventoService {

  listar(): Observable<Evento[]> {
    return of(EVENTOS);
  }

  /** Eventos que todavía se pueden reservar. */
  listarDisponibles(): Observable<Evento[]> {
    return of(
      EVENTOS.filter(evento => evento.estado === 'Programado' || evento.estado === 'En Boletería')
    );
  }

  obtenerPorId(id: number): Observable<Evento | undefined> {
    return of(EVENTOS.find(evento => evento.id === id));
  }

  listarPorAgente(agenteId: number): Observable<Evento[]> {
    return of(EVENTOS.filter(evento => evento.agenteId === agenteId));
  }

  listarCancelados(): Observable<Evento[]> {
    return of(EVENTOS.filter(evento => evento.estado === 'Cancelado'));
  }
}
