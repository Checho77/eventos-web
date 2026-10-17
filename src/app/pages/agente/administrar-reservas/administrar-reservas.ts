import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ESTADOS_RESERVA } from '../../../models/estados';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-administrar-reservas',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, EstadoBadge],
  templateUrl: './administrar-reservas.html',
  styleUrl: './administrar-reservas.scss'
})
export class AdministrarReservas {
  private reservaService = inject(ReservaService);

  reservas$ = this.reservaService.listarTodas();
  estados = ESTADOS_RESERVA;
}
