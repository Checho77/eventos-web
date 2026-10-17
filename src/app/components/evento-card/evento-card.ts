import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';
import { EstadoBadge } from '../estado-badge/estado-badge';

@Component({
  selector: 'app-evento-card',
  imports: [DatePipe, CurrencyPipe, RouterLink, EstadoBadge],
  templateUrl: './evento-card.html',
  styleUrl: './evento-card.scss'
})
export class EventoCard {
  @Input({ required: true }) evento!: Evento;
  @Input() mostrarReservar = true;
}
