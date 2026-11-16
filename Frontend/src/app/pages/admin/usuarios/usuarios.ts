import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class AdminUsuarios {
  private usuarioService = inject(UsuarioService);

  tipo: 'clientes' | 'agentes' | 'administradores' = 'clientes';

  private recargarClientes$ = new BehaviorSubject<void>(undefined);
  clientes$ = this.recargarClientes$.pipe(switchMap(() => this.usuarioService.listarClientes()));

  private recargarAgentes$ = new BehaviorSubject<void>(undefined);
  agentes$ = this.recargarAgentes$.pipe(switchMap(() => this.usuarioService.listarAgentes()));

  private recargarAdmins$ = new BehaviorSubject<void>(undefined);
  administradores$ = this.recargarAdmins$.pipe(switchMap(() => this.usuarioService.listarAdministradores()));

  // Edición rápida de Cliente
  clienteEditando: any = null;
  // Edición rápida de Agente
  agenteEditando: any = null;
  // Edición rápida de Administrador
  adminEditando: any = null;

  // Clientes
  iniciarEditarCliente(c: any): void {
    this.clienteEditando = { ...c };
  }
  guardarCliente(): void {
    if (!this.clienteEditando) return;
    this.usuarioService
      .actualizarCliente(this.clienteEditando.id, {
        puntos: Number(this.clienteEditando.puntos),
        visualizaPublicidad: Boolean(this.clienteEditando.visualizaPublicidad),
      })
      .subscribe({
        next: () => {
          this.clienteEditando = null;
          this.recargarClientes$.next();
        },
        error: (err) => alert(err?.error?.error || 'Error al actualizar cliente'),
      });
  }
  eliminarCliente(id: number): void {
    if (!confirm('¿Eliminar este cliente y su cuenta?')) return;
    this.usuarioService.eliminarCliente(id).subscribe({
      next: () => this.recargarClientes$.next(),
      error: (err) => alert(err?.error?.error || 'No se puede eliminar porque tiene reservas asociadas'),
    });
  }

  // Agentes
  iniciarEditarAgente(a: any): void {
    this.agenteEditando = { ...a };
  }
  guardarAgente(): void {
    if (!this.agenteEditando) return;
    this.usuarioService
      .actualizarAgente(this.agenteEditando.id, {
        comision: Number(this.agenteEditando.comision),
        experiencia: Number(this.agenteEditando.experiencia),
      })
      .subscribe({
        next: () => {
          this.agenteEditando = null;
          this.recargarAgentes$.next();
        },
        error: (err) => alert(err?.error?.error || 'Error al actualizar agente'),
      });
  }
  eliminarAgente(id: number): void {
    if (!confirm('¿Eliminar este agente?')) return;
    this.usuarioService.eliminarAgente(id).subscribe({
      next: () => this.recargarAgentes$.next(),
      error: (err) => alert(err?.error?.error || 'No se puede eliminar porque tiene eventos asociados'),
    });
  }

  // Administradores
  iniciarEditarAdmin(adm: any): void {
    this.adminEditando = { ...adm };
  }
  guardarAdmin(): void {
    if (!this.adminEditando) return;
    this.usuarioService
      .actualizarAdministrador(this.adminEditando.id, {
        salario: Number(this.adminEditando.salario),
        horario: this.adminEditando.horario,
      })
      .subscribe({
        next: () => {
          this.adminEditando = null;
          this.recargarAdmins$.next();
        },
        error: (err) => alert(err?.error?.error || 'Error al actualizar administrador'),
      });
  }
  eliminarAdmin(id: number): void {
    if (!confirm('¿Eliminar este administrador?')) return;
    this.usuarioService.eliminarAdministrador(id).subscribe({
      next: () => this.recargarAdmins$.next(),
      error: (err) => alert(err?.error?.error || 'Error al eliminar administrador'),
    });
  }
}
