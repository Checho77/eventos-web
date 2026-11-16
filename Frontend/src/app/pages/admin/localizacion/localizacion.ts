import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UbicacionService, Pais, Departamento } from '../../../services/ubicacion.service';
import { Ciudad } from '../../../models/ubicacion';

@Component({
  selector: 'app-admin-localizacion',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './localizacion.html',
  styleUrl: './localizacion.scss'
})
export class AdminLocalizacion {
  private ubicacionService = inject(UbicacionService);

  pestana: 'paises' | 'departamentos' | 'ciudades' = 'paises';

  // Streams de recarga reactiva
  private recargarPaises$ = new BehaviorSubject<void>(undefined);
  paises$ = this.recargarPaises$.pipe(switchMap(() => this.ubicacionService.listarPaises()));

  private recargarDeptos$ = new BehaviorSubject<void>(undefined);
  departamentos$ = this.recargarDeptos$.pipe(switchMap(() => this.ubicacionService.listarDepartamentos()));

  private recargarCiudades$ = new BehaviorSubject<void>(undefined);
  ciudades$ = this.recargarCiudades$.pipe(switchMap(() => this.ubicacionService.listarCiudades()));

  // Formularios
  nuevoPais = '';
  nuevoDeptoNombre = '';
  nuevoDeptoPaisId: number | null = null;
  nuevaCiudadNombre = '';
  nuevaCiudadDeptoId: number | null = null;

  cargando = false;
  errorMensaje = '';

  crearPais(): void {
    if (!this.nuevoPais.trim()) return;
    this.cargando = true;
    this.errorMensaje = '';
    this.ubicacionService.crearPais(this.nuevoPais.trim()).subscribe({
      next: () => {
        this.nuevoPais = '';
        this.cargando = false;
        this.recargarPaises$.next();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.error || 'Error al crear el país';
      }
    });
  }

  eliminarPais(id: number): void {
    if (!confirm('¿Deseas eliminar este país? Recuerda que no debe tener departamentos asociados.')) return;
    this.ubicacionService.eliminarPais(id).subscribe({
      next: () => this.recargarPaises$.next(),
      error: (err) => alert(err?.error?.error || 'No se puede eliminar porque tiene datos relacionados')
    });
  }

  crearDepartamento(): void {
    if (!this.nuevoDeptoNombre.trim() || !this.nuevoDeptoPaisId) return;
    this.cargando = true;
    this.errorMensaje = '';
    this.ubicacionService.crearDepartamento(this.nuevoDeptoNombre.trim(), this.nuevoDeptoPaisId).subscribe({
      next: () => {
        this.nuevoDeptoNombre = '';
        this.cargando = false;
        this.recargarDeptos$.next();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.error || 'Error al crear departamento';
      }
    });
  }

  eliminarDepartamento(id: number): void {
    if (!confirm('¿Deseas eliminar este departamento?')) return;
    this.ubicacionService.eliminarDepartamento(id).subscribe({
      next: () => this.recargarDeptos$.next(),
      error: (err) => alert(err?.error?.error || 'No se puede eliminar porque tiene datos relacionados')
    });
  }

  crearCiudad(): void {
    if (!this.nuevaCiudadNombre.trim() || !this.nuevaCiudadDeptoId) return;
    this.cargando = true;
    this.errorMensaje = '';
    this.ubicacionService.crearCiudad(this.nuevaCiudadNombre.trim(), this.nuevaCiudadDeptoId).subscribe({
      next: () => {
        this.nuevaCiudadNombre = '';
        this.cargando = false;
        this.recargarCiudades$.next();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.error || 'Error al crear ciudad';
      }
    });
  }

  eliminarCiudad(id: number): void {
    if (!confirm('¿Deseas eliminar esta ciudad?')) return;
    this.ubicacionService.eliminarCiudad(id).subscribe({
      next: () => this.recargarCiudades$.next(),
      error: (err) => alert(err?.error?.error || 'No se puede eliminar porque tiene eventos o usuarios asociados')
    });
  }
}
