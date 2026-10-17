import { EstadoReserva } from './estados';
import { Evento } from './evento';
import { Cliente } from './persona';

export interface Reserva {
  id: number;
  fecha: string;
  valorTotal: number;
  numeroEntradas: number;
  observaciones: string;
  estado: EstadoReserva;
  clienteId: number;
  eventoId: number;
  causaCancelacion?: string;
}

/** Reserva junto con los datos completos de su evento y su cliente. */
export interface ReservaDetalle extends Reserva {
  evento: Evento;
  cliente: Cliente;
}

export interface HistorialCliente {
  cliente: Cliente;
  reservas: ReservaDetalle[];
}
