import { Reserva } from '../models/reserva';

export const RESERVAS: Reserva[] = [
  { id: 1, fecha: '2026-10-01T10:15:00', valorTotal: 120000, numeroEntradas: 2, observaciones: 'Zona preferencial', estado: 'Confirmada', clienteId: 1, eventoId: 1 },
  { id: 2, fecha: '2026-10-02T14:30:00', valorTotal: 280000, numeroEntradas: 4, observaciones: 'Grupo familiar', estado: 'Reservada', clienteId: 3, eventoId: 2 },
  { id: 3, fecha: '2026-10-03T09:00:00', valorTotal: 135000, numeroEntradas: 3, observaciones: 'Sin observaciones', estado: 'Confirmada', clienteId: 2, eventoId: 4 },
  { id: 4, fecha: '2026-10-05T16:45:00', valorTotal: 190000, numeroEntradas: 2, observaciones: 'Cerca del escenario', estado: 'Reservada', clienteId: 1, eventoId: 3 },
  { id: 5, fecha: '2026-10-06T11:20:00', valorTotal: 120000, numeroEntradas: 1, observaciones: 'Sin observaciones', estado: 'Confirmada', clienteId: 3, eventoId: 5 },
  { id: 6, fecha: '2026-09-10T18:00:00', valorTotal: 220000, numeroEntradas: 2, observaciones: 'Sin observaciones', estado: 'Confirmada', clienteId: 1, eventoId: 6 },
  { id: 7, fecha: '2026-08-01T12:00:00', valorTotal: 240000, numeroEntradas: 3, observaciones: 'Sin observaciones', estado: 'Confirmada', clienteId: 2, eventoId: 7 },
  { id: 8, fecha: '2026-10-08T08:30:00', valorTotal: 300000, numeroEntradas: 2, observaciones: 'Sin observaciones', estado: 'Cancelada', clienteId: 3, eventoId: 8, causaCancelacion: 'El evento fue cancelado por condiciones climáticas.' },
  { id: 9, fecha: '2026-10-09T13:10:00', valorTotal: 260000, numeroEntradas: 2, observaciones: 'Palco', estado: 'Reservada', clienteId: 2, eventoId: 9 },
  { id: 10, fecha: '2026-10-10T19:00:00', valorTotal: 300000, numeroEntradas: 5, observaciones: 'Sin observaciones', estado: 'Cancelada', clienteId: 2, eventoId: 1, causaCancelacion: 'El cliente solicitó la cancelación.' }
];
