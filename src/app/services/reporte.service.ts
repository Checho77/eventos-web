import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  EventosAgenteCiudad,
  IngresoMensual,
  PromedioIngreso,
  ReservasEventoMes,
  ResumenSistema
} from '../models/reportes';
import { ADMINISTRADORES, AGENTES, CLIENTES } from '../mocks/personas.mock';
import { EVENTOS } from '../mocks/eventos.mock';
import { RESERVAS } from '../mocks/reservas.mock';
import {
  EVENTOS_POR_AGENTE_CIUDAD,
  INGRESOS_MENSUALES,
  PROMEDIO_POR_AGENTE,
  PROMEDIO_POR_CLIENTE,
  RESERVAS_POR_EVENTO_MES
} from '../mocks/reportes.mock';

@Injectable({ providedIn: 'root' })
export class ReporteService {

  resumen(): Observable<ResumenSistema> {
    return of({
      clientes: CLIENTES.length,
      agentes: AGENTES.length,
      administradores: ADMINISTRADORES.length,
      reservas: RESERVAS.length,
      eventos: EVENTOS.length
    });
  }

  ingresosMensuales(): Observable<IngresoMensual[]> {
    return of(INGRESOS_MENSUALES);
  }

  /** Mayor ingreso mensual: sirve para calcular el ancho de las barras. */
  ingresoMensualMaximo(): number {
    return Math.max(...INGRESOS_MENSUALES.map(item => item.ingresos));
  }

  ingresosTotales(): number {
    return INGRESOS_MENSUALES.reduce((total, item) => total + item.ingresos, 0);
  }

  promedioPorAgente(): Observable<PromedioIngreso[]> {
    return of(PROMEDIO_POR_AGENTE);
  }

  promedioPorCliente(): Observable<PromedioIngreso[]> {
    return of(PROMEDIO_POR_CLIENTE);
  }

  reservasPorEventoMes(): Observable<ReservasEventoMes[]> {
    return of(RESERVAS_POR_EVENTO_MES);
  }

  eventosPorAgenteCiudad(): Observable<EventosAgenteCiudad[]> {
    return of(EVENTOS_POR_AGENTE_CIUDAD);
  }
}
