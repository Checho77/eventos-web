import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ESTADOS_EVENTO } from '../../../models/estados';
import { EventoService } from '../../../services/evento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-mis-eventos',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, EstadoBadge, FormsModule],
  templateUrl: './mis-eventos.html',
  styleUrl: './mis-eventos.scss'
})
export class MisEventos {
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);

  agente = this.usuarioService.agenteActual();
  estados = ESTADOS_EVENTO;

  private recargar$ = new BehaviorSubject<void>(undefined);
  eventos$ = this.recargar$.pipe(
    switchMap(() => this.eventoService.listarPorAgente(this.agente.id))
  );

  eventoEditando: any = null;
  cargandoEdicion = false;
  errorEdicion = '';

  iniciarEdicion(evento: any): void {
    this.eventoEditando = {
      ...evento,
      fechaInicio: evento.fechaInicio?.slice(0, 16),
      fechaFin: evento.fechaFin?.slice(0, 16),
    };
    this.errorEdicion = '';
  }

  cancelarEdicion(): void {
    this.eventoEditando = null;
    this.errorEdicion = '';
  }

  guardarEdicion(): void {
    if (!this.eventoEditando) return;
    this.cargandoEdicion = true;
    this.errorEdicion = '';

    this.eventoService
      .actualizar(this.eventoEditando.id, {
        nombre: this.eventoEditando.nombre,
        descripcion: this.eventoEditando.descripcion,
        teatro: this.eventoEditando.teatro,
        fechaInicio: this.eventoEditando.fechaInicio,
        fechaFin: this.eventoEditando.fechaFin,
        capacidad: Number(this.eventoEditando.capacidad),
        precioBase: Number(this.eventoEditando.precioBase),
        observaciones: this.eventoEditando.observaciones,
        estado: this.eventoEditando.estado,
      })
      .subscribe({
        next: () => {
          this.cargandoEdicion = false;
          this.eventoEditando = null;
          this.recargar$.next();
        },
        error: (err) => {
          this.cargandoEdicion = false;
          this.errorEdicion = err?.error?.error || 'No fue posible actualizar el evento';
        },
      });
  }

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
