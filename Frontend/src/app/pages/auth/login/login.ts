import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  correo = '';
  clave = '';
  cargando = false;
  errorMensaje = '';
  infoMensaje = '';

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['expirada'] === 'true') {
      this.infoMensaje = 'Tu sesión ha expirado o el token es inválido. Por favor inicia sesión nuevamente.';
    }
  }

  iniciarSesion(): void {
    if (!this.correo || !this.clave) {
      this.errorMensaje = 'Por favor ingresa tu correo y contraseña';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';
    this.infoMensaje = '';

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

  iniciarComoDemo(tipo: 'cliente' | 'agente' | 'admin'): void {
    if (tipo === 'cliente') {
      this.correo = 'carlos.ramirez@email.com';
    } else if (tipo === 'agente') {
      this.correo = 'andres.cifuentes@eventos.com';
    } else {
      this.correo = 'admin@eventos.com';
    }
    this.clave = '123456';
    this.iniciarSesion();
  }
}
