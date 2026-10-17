import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  selector: 'app-registro',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private ubicacionService = inject(UbicacionService);

  ciudades$ = this.ubicacionService.listarCiudades();
}
