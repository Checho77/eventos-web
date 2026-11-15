import { Ciudad } from '../models/ubicacion';

export const CALI: Ciudad = { id: 1, nombre: 'Cali', departamento: 'Valle del Cauca', pais: 'Colombia' };
export const BOGOTA: Ciudad = { id: 2, nombre: 'Bogotá', departamento: 'Cundinamarca', pais: 'Colombia' };
export const MEDELLIN: Ciudad = { id: 3, nombre: 'Medellín', departamento: 'Antioquia', pais: 'Colombia' };
export const TULUA: Ciudad = { id: 4, nombre: 'Tuluá', departamento: 'Valle del Cauca', pais: 'Colombia' };
export const BARRANQUILLA: Ciudad = { id: 5, nombre: 'Barranquilla', departamento: 'Atlántico', pais: 'Colombia' };
export const CIUDAD_DE_MEXICO: Ciudad = { id: 6, nombre: 'Ciudad de México', departamento: 'Ciudad de México', pais: 'México' };

export const CIUDADES: Ciudad[] = [
  CALI,
  BOGOTA,
  MEDELLIN,
  TULUA,
  BARRANQUILLA,
  CIUDAD_DE_MEXICO
];
