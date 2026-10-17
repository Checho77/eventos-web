import {
  EventosAgenteCiudad,
  IngresoMensual,
  PromedioIngreso,
  ReservasEventoMes
} from '../models/reportes';

export const INGRESOS_MENSUALES: IngresoMensual[] = [
  { mes: 'Enero', ingresos: 4800000 },
  { mes: 'Febrero', ingresos: 5200000 },
  { mes: 'Marzo', ingresos: 6100000 },
  { mes: 'Abril', ingresos: 5500000 },
  { mes: 'Mayo', ingresos: 7200000 },
  { mes: 'Junio', ingresos: 8100000 },
  { mes: 'Julio', ingresos: 7600000 },
  { mes: 'Agosto', ingresos: 9300000 },
  { mes: 'Septiembre', ingresos: 8800000 },
  { mes: 'Octubre', ingresos: 10400000 }
];

export const PROMEDIO_POR_AGENTE: PromedioIngreso[] = [
  { nombre: 'Andrés Cifuentes', promedio: 2850000 },
  { nombre: 'Valentina Mora', promedio: 3200000 }
];

export const PROMEDIO_POR_CLIENTE: PromedioIngreso[] = [
  { nombre: 'Laura Gómez', promedio: 310000 },
  { nombre: 'Carlos Ramírez', promedio: 225000 },
  { nombre: 'Marta Rojas', promedio: 400000 }
];

export const RESERVAS_POR_EVENTO_MES: ReservasEventoMes[] = [
  { evento: 'Festival Salsa al Parque', mes: 'Octubre', reservas: 7 },
  { evento: 'Obra: La Vorágine', mes: 'Octubre', reservas: 4 },
  { evento: 'Noche de Comedia Stand-Up', mes: 'Octubre', reservas: 3 },
  { evento: 'Concierto Sinfónico de Navidad', mes: 'Octubre', reservas: 2 },
  { evento: 'Festival de Jazz de Medellín', mes: 'Agosto', reservas: 3 }
];

export const EVENTOS_POR_AGENTE_CIUDAD: EventosAgenteCiudad[] = [
  { agente: 'Andrés Cifuentes', ciudad: 'Cali', eventos: 2 },
  { agente: 'Andrés Cifuentes', ciudad: 'Bogotá', eventos: 1 },
  { agente: 'Andrés Cifuentes', ciudad: 'Barranquilla', eventos: 1 },
  { agente: 'Andrés Cifuentes', ciudad: 'Medellín', eventos: 1 },
  { agente: 'Valentina Mora', ciudad: 'Medellín', eventos: 1 },
  { agente: 'Valentina Mora', ciudad: 'Tuluá', eventos: 1 },
  { agente: 'Valentina Mora', ciudad: 'Bogotá', eventos: 1 },
  { agente: 'Valentina Mora', ciudad: 'Ciudad de México', eventos: 1 }
];
