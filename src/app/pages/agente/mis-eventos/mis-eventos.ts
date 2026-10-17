import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-mis-eventos',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, EstadoBadge],
  templateUrl: './mis-eventos.html',
  styleUrl: './mis-eventos.scss'
})
export class MisEventos {
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);

  agente = this.usuarioService.agenteActual();
  eventos$ = this.eventoService.listarPorAgente(this.agente.id);
}
