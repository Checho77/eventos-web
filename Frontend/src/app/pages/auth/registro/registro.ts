import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UbicacionService } from '../../../services/ubicacion.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro',
  imports: [AsyncPipe, RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private ubicacionService = inject(UbicacionService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ciudades$ = this.ubicacionService.listarCiudades();

  tipo = 'Cliente';
  identificacion = '';
  nombreCompleto = '';
  correo = '';
  telefono = '';
  direccion = '';
  ciudadId: number | null = null;
  clave = '';
  experiencia: number | null = null;

  cargando = false;
  errorMensaje = '';

  registrar(): void {
    if (!this.identificacion.trim() || !this.nombreCompleto.trim() || !this.correo.trim()) {
      this.errorMensaje = 'Identificación, nombre y correo son obligatorios';
      return;
    }
    if (!this.ciudadId) {
      this.errorMensaje = 'Debes seleccionar una ciudad';
      return;
    }
    if (!this.clave || this.clave.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    const datos = {
      identificacion: this.identificacion.trim(),
      nombreCompleto: this.nombreCompleto.trim(),
      correo: this.correo.trim(),
      direccion: this.direccion.trim() || 'Dirección no especificada',
      ciudadId: this.ciudadId,
      password: this.clave,
      telefonos: this.telefono.trim() ? [this.telefono.trim()] : [],
    };

    this.usuarioService.registro(datos).subscribe({
      next: () => {
        this.cargando = false;
        alert('¡Registro exitoso! Ya puedes iniciar sesión con tu correo y contraseña.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.error || 'No fue posible completar el registro';
      },
    });
  }
}
