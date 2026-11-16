import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  private recargar$ = new BehaviorSubject<void>(undefined);
  eventos$ = this.recargar$.pipe(
    switchMap(() => this.eventoService.listarPorAgente(this.agente.id))
  );

  cancelarEvento(id: number): void {
    const causa = prompt('Ingresa el motivo de cancelación del evento:');
    if (!causa || causa.trim() === '') return;

    this.eventoService
      .actualizar(id, {
        estado: 'Cancelado',
        causaCancelacion: causa.trim(),
      })
      .subscribe({
        next: () => {
          this.recargar$.next();
        },
        error: (err) => {
          alert(err?.error?.error || 'No fue posible cancelar el evento');
        },
      });
  }

  eliminarEvento(id: number): void {
    if (!confirm('¿Deseas eliminar este evento? Esta acción no se puede deshacer.')) return;

    this.eventoService.eliminar(id).subscribe({
      next: () => {
        this.recargar$.next();
      },
      error: (err) => {
        alert(err?.error?.error || 'No se puede eliminar porque ya tiene reservas asociadas.');
      },
    });
  }
}
