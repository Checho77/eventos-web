export interface ResumenSistema {
  clientes: number;
  agentes: number;
  administradores: number;
  reservas: number;
  eventos: number;
}

export interface IngresoMensual {
  mes: string;
  ingresos: number;
}

export interface PromedioIngreso {
  nombre: string;
  promedio: number;
}

export interface ReservasEventoMes {
  evento: string;
  mes: string;
  reservas: number;
}

export interface EventosAgenteCiudad {
  agente: string;
  ciudad: string;
  eventos: number;
}
