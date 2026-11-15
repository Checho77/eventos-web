import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  reservas$ = this.reservaService.listarPorCliente(this.cliente.id);
}
