import { Ciudad } from './ubicacion';
import { EstadoEvento } from './estados';

export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: Ciudad;
  fechaInicio: string;
  fechaFin: string;
  capacidad: number;
  precioBase: number;
  observaciones: string;
  estado: EstadoEvento;
  agenteId: number;
  causaCancelacion?: string;
}

/** Datos necesarios para registrar un evento nuevo (Utility Type Omit). */
export type NuevoEvento = Omit<Evento, 'id' | 'estado' | 'causaCancelacion'>;
