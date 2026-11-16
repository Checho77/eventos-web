export interface ReservaModel {
  id: number;
  fecha: string;
  valorTotal: number;
  numeroEntradas: number;
  observaciones: string;
  estado: "Reservada" | "Confirmada" | "Cancelada";
  clienteId: number;
  eventoId: number;
  causaCancelacion?: string | null;
}
