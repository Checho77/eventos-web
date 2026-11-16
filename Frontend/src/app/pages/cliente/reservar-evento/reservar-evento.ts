import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { ReservaService } from '../../../services/reserva.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EstadoBadge } from '../../../components/estado-badge/estado-badge';

@Component({
  selector: 'app-reservar-evento',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, EstadoBadge, FormsModule],
  templateUrl: './reservar-evento.html',
  styleUrl: './reservar-evento.scss'
})
export class ReservarEvento {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventoService = inject(EventoService);
  private reservaService = inject(ReservaService);
  private usuarioService = inject(UsuarioService);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  evento$ = this.eventoService.obtenerPorId(this.id);

  numeroEntradas = 1;
  observaciones = '';
  cargando = false;
  errorMensaje = '';

  confirmarReserva(): void {
    if (this.numeroEntradas <= 0) {
      this.errorMensaje = 'Debes seleccionar al menos una entrada';
      return;
    }
    this.cargando = true;
    this.errorMensaje = '';

    const cliente = this.usuarioService.clienteActual();
    this.reservaService
      .crear({
        clienteId: cliente.id,
        eventoId: this.id,
        numeroEntradas: this.numeroEntradas,
        observaciones: this.observaciones,
      })
      .subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/cliente/mis-reservas']);
        },
        error: (err) => {
          this.cargando = false;
          this.errorMensaje = err?.error?.error || 'No fue posible registrar la reserva';
        },
      });
  }
}
