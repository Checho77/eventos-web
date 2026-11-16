import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ESTADOS_EVENTO } from '../../../models/estados';
import { UbicacionService } from '../../../services/ubicacion.service';
import { EventoService } from '../../../services/evento.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registrar-evento',
  imports: [AsyncPipe, RouterLink, FormsModule],
  templateUrl: './registrar-evento.html',
  styleUrl: './registrar-evento.scss'
})
export class RegistrarEvento {
  private ubicacionService = inject(UbicacionService);
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ciudades$ = this.ubicacionService.listarCiudades();
  estados = ESTADOS_EVENTO;

  nombre = '';
  estado = 'Programado';
  descripcion = '';
  teatro = '';
  ciudadId: number | null = null;
  fechaInicio = '';
  fechaFin = '';
  capacidad: number | null = null;
  precioBase: number | null = null;
  observaciones = '';

  cargando = false;
  errorMensaje = '';

  registrarEvento(): void {
    if (!this.nombre.trim() || !this.teatro.trim()) {
      this.errorMensaje = 'El nombre y el teatro son obligatorios';
      return;
    }
    if (!this.ciudadId) {
      this.errorMensaje = 'Debes seleccionar una ciudad';
      return;
    }
    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMensaje = 'Debes especificar fechas de inicio y finalización';
      return;
    }
    if (!this.capacidad || this.capacidad <= 0) {
      this.errorMensaje = 'La capacidad debe ser mayor a 0';
      return;
    }
    if (this.precioBase === null || this.precioBase < 0) {
      this.errorMensaje = 'El precio base no puede ser negativo';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    const agente = this.usuarioService.agenteActual();

    this.eventoService
      .crear({
        nombre: this.nombre,
        descripcion: this.descripcion,
        teatro: this.teatro,
        ciudadId: this.ciudadId,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        capacidad: this.capacidad,
        precioBase: this.precioBase,
        observaciones: this.observaciones,
        estado: this.estado,
        agenteId: agente.id,
      })
      .subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/agente/eventos']);
        },
        error: (err) => {
          this.cargando = false;
          this.errorMensaje = err?.error?.error || 'Error al registrar el evento';
        },
      });
  }
}
