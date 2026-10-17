import { Component, Input } from '@angular/core';
import { EstadoEvento, EstadoReserva } from '../../models/estados';

type Estado = EstadoEvento | EstadoReserva;

/** Record: asocia cada estado con la clase de Bootstrap de su color. */
const CLASES: Record<Estado, string> = {
  'Programado': 'bg-secondary',
  'En Boletería': 'bg-primary',
  'En Vivo': 'bg-success',
  'Finalizado': 'bg-dark',
  'Cancelado': 'bg-danger',
  'Reservada': 'bg-warning text-dark',
  'Confirmada': 'bg-success',
  'Cancelada': 'bg-danger'
};

@Component({
  selector: 'app-estado-badge',
  templateUrl: './estado-badge.html',
  styleUrl: './estado-badge.scss'
})
export class EstadoBadge {
  @Input({ required: true }) estado!: Estado;

  get clase(): string {
    return CLASES[this.estado];
  }
}
