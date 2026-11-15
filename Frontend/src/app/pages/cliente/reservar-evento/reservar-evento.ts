import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-reservar-evento',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, EstadoBadge],
  templateUrl: './reservar-evento.html',
  styleUrl: './reservar-evento.scss'
})
export class ReservarEvento {
  private route = inject(ActivatedRoute);
  private eventoService = inject(EventoService);

  /** El id llega por la ruta: cliente/eventos/:id/reservar */
  private id = Number(this.route.snapshot.paramMap.get('id'));

  evento$ = this.eventoService.obtenerPorId(this.id);
}
