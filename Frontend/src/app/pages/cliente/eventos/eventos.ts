import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { EventoCard } from '../../../components/evento-card/evento-card';

@Component({
  selector: 'app-eventos',
  imports: [AsyncPipe, EventoCard],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss'
})
export class Eventos {
  private eventoService = inject(EventoService);

  eventos$ = this.eventoService.listarDisponibles();
}
