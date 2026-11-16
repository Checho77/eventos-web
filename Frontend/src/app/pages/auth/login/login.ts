import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  correo = '';
  clave = '';
  cargando = false;
  errorMensaje = '';

  iniciarSesion(): void {
    if (!this.correo || !this.clave) {
      this.errorMensaje = 'Por favor ingresa tu correo y contraseña';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.usuarioService.login(this.correo, this.clave).subscribe({
      next: (res) => {
        this.cargando = false;
        const rol = res.usuario?.rol;
        if (rol === 'agente') {
          this.router.navigate(['/agente/eventos']);
        } else if (rol === 'administrador') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/cliente/eventos']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.error || 'Correo o contraseña incorrectos';
      },
    });
  }
}
