export interface PaisModel {
  id: number;
  nombre: string;
}

export interface DepartamentoModel {
  id: number;
  nombre: string;
  paisId: number;
}

export interface CiudadModel {
  id: number;
  nombre: string;
  departamentoId: number;
}
