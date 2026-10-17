import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HistorialCliente, Reserva, ReservaDetalle } from '../models/reserva';
import { RESERVAS } from '../mocks/reservas.mock';
import { EVENTOS } from '../mocks/eventos.mock';
import { CLIENTES } from '../mocks/personas.mock';

@Injectable({ providedIn: 'root' })
export class ReservaService {

  /** Agrega a la reserva los datos completos de su evento y su cliente. */
  private aDetalle(reserva: Reserva): ReservaDetalle {
    const evento = EVENTOS.find(e => e.id === reserva.eventoId)!;
    const cliente = CLIENTES.find(c => c.id === reserva.clienteId)!;
    return { ...reserva, evento, cliente };
  }

  listarTodas(): Observable<ReservaDetalle[]> {
    return of(RESERVAS.map(reserva => this.aDetalle(reserva)));
  }

  listarPorCliente(clienteId: number): Observable<ReservaDetalle[]> {
    return of(
      RESERVAS
        .filter(reserva => reserva.clienteId === clienteId)
        .map(reserva => this.aDetalle(reserva))
    );
  }

  listarCanceladas(): Observable<ReservaDetalle[]> {
    return of(
      RESERVAS
        .filter(reserva => reserva.estado === 'Cancelada')
        .map(reserva => this.aDetalle(reserva))
    );
  }

  historialPorCliente(): Observable<HistorialCliente[]> {
    return of(
      CLIENTES.map(cliente => ({
        cliente,
        reservas: RESERVAS
          .filter(reserva => reserva.clienteId === cliente.id)
          .map(reserva => this.aDetalle(reserva))
      }))
    );
  }
}
