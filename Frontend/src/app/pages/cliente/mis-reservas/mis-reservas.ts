import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReservaService } from '../../../services/reserva.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-mis-reservas',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, EstadoBadge],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.scss'
})
export class MisReservas {
  private reservaService = inject(ReservaService);
  private usuarioService = inject(UsuarioService);

  cliente = this.usuarioService.clienteActual();

  private recargar$ = new BehaviorSubject<void>(undefined);
  reservas$ = this.recargar$.pipe(
    switchMap(() => this.reservaService.listarPorCliente(this.cliente.id))
  );

  cancelarReserva(id: number): void {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;

    this.reservaService
      .actualizar(id, {
        estado: 'Cancelada',
        causaCancelacion: 'Cancelada por solicitud del cliente',
      })
      .subscribe({
        next: () => {
          this.recargar$.next();
        },
        error: (err) => {
          alert(err?.error?.error || 'No fue posible cancelar la reserva');
        },
      });
  }
}
