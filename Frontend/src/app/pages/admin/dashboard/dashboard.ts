import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EventoService } from '../../../services/evento.service';
import { ReporteService } from '../../../services/reporte.service';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, EstadoBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private reporteService = inject(ReporteService);
  private eventoService = inject(EventoService);
  private reservaService = inject(ReservaService);

  /** Reporte general de registros */
  resumen$ = this.reporteService.resumen();
  ingresosTotales = 0;
  maxIngreso = 1;

  /** Reportes comerciales */
  ingresosMensuales$ = this.reporteService.ingresosMensuales().pipe(
    tap(meses => {
      if (meses && meses.length > 0) {
        this.ingresosTotales = meses.reduce((total, item) => total + item.ingresos, 0);
        this.maxIngreso = Math.max(1, ...meses.map(item => item.ingresos));
      }
    })
  );
  promedioAgentes$ = this.reporteService.promedioPorAgente();
  promedioClientes$ = this.reporteService.promedioPorCliente();
  reservasEventoMes$ = this.reporteService.reservasPorEventoMes();
  eventosAgenteCiudad$ = this.reporteService.eventosPorAgenteCiudad();
  eventosUbicacion$ = this.reporteService.eventosPorUbicacion();

  /** Cobertura y eventos */
  eventos$ = this.eventoService.listar();

  /** Reservas y operación */
  historial$ = this.reservaService.historialPorCliente();
  reservasCanceladas$ = this.reservaService.listarCanceladas();
  eventosCancelados$ = this.eventoService.listarCancelados();
}
