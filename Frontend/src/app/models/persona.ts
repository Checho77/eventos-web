import { Ciudad } from './ubicacion';

/**
 * TODO: PERSONAS
 * Clientes, agentes y administradores comparten los datos de Persona
 * y cada uno agrega su información adicional (herencia con extends).
 */
export interface Persona {
  id: number;
  identificacion: string;
  nombreCompleto: string;
  correo: string;
  direccion: string;
  ciudad: Ciudad;
  telefonos: string[];
}

export interface Cliente extends Persona {
  puntos: number;
  visualizaPublicidad: boolean;
}

export interface Agente extends Persona {
  comision: number;      // porcentaje
  experiencia: number;   // años
}

export interface Administrador extends Persona {
  salario: number;
  horario: string;
}
