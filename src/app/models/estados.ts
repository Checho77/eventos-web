/**
 * TODO: ESTADOS (Literal Types)
 * Limitan los valores permitidos para el estado de un evento y de una reserva.
 */
export type EstadoEvento = 'Programado' | 'En Boletería' | 'En Vivo' | 'Finalizado' | 'Cancelado';
export type EstadoReserva = 'Reservada' | 'Confirmada' | 'Cancelada';

/** Listas para llenar selects de forma dinámica con @for */
export const ESTADOS_EVENTO: EstadoEvento[] = [
  'Programado',
  'En Boletería',
  'En Vivo',
  'Finalizado',
  'Cancelado'
];

export const ESTADOS_RESERVA: EstadoReserva[] = [
  'Reservada',
  'Confirmada',
  'Cancelada'
];
