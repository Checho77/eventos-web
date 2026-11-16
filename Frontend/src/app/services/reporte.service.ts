import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EventosAgenteCiudad,
  IngresoMensual,
  PromedioIngreso,
  ReservasEventoMes,
  ResumenSistema,
} from '../models/reportes';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/reportes';

  resumen(): Observable<ResumenSistema> {
    return this.http.get<ResumenSistema>(`${this.apiUrl}/resumen`);
  }

  ingresosMensuales(): Observable<IngresoMensual[]> {
    return this.http.get<IngresoMensual[]>(`${this.apiUrl}/ingresos-mensuales`);
  }

  promedioPorAgente(): Observable<PromedioIngreso[]> {
    return this.http.get<PromedioIngreso[]>(`${this.apiUrl}/promedio-agente`);
  }

  promedioPorCliente(): Observable<PromedioIngreso[]> {
    return this.http.get<PromedioIngreso[]>(`${this.apiUrl}/promedio-cliente`);
  }

  reservasPorEventoMes(): Observable<ReservasEventoMes[]> {
    return this.http.get<ReservasEventoMes[]>(`${this.apiUrl}/reservas-evento-mes`);
  }

  eventosPorAgenteCiudad(): Observable<EventosAgenteCiudad[]> {
    return this.http.get<EventosAgenteCiudad[]>(`${this.apiUrl}/eventos-agente-ciudad`);
  }

  ingresoMensualMaximo(): number {
    return 1000000;
  }

  ingresosTotales(): number {
    return 0;
  }
}
