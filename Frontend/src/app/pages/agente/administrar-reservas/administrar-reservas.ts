import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  private recargar$ = new BehaviorSubject<void>(undefined);
  reservas$ = this.recargar$.pipe(switchMap(() => this.reservaService.listarTodas()));
  estados = ESTADOS_RESERVA;

  actualizarEstado(reservaId: number, selectElem: HTMLSelectElement): void {
    const nuevoEstado = selectElem.value;
    this.reservaService.actualizar(reservaId, { estado: nuevoEstado }).subscribe({
      next: () => {
        this.recargar$.next();
      },
      error: (err) => {
        alert(err?.error?.error || 'Error al actualizar la reserva');
      },
    });
  }
}
