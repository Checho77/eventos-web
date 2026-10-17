import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ESTADOS_EVENTO } from '../../../models/estados';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  selector: 'app-registrar-evento',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './registrar-evento.html',
  styleUrl: './registrar-evento.scss'
})
export class RegistrarEvento {
  private ubicacionService = inject(UbicacionService);

  ciudades$ = this.ubicacionService.listarCiudades();
  estados = ESTADOS_EVENTO;
}
