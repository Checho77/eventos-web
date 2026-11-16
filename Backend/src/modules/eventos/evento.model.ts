export interface EventoModel {
  id: number;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudadId: number;
  fechaInicio: string;
  fechaFin: string;
  capacidad: number;
  precioBase: number;
  observaciones: string;
  estado: "Programado" | "En Boletería" | "En Vivo" | "Finalizado" | "Cancelado";
  agenteId: number;
  causaCancelacion?: string | null;
}
