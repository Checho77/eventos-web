import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ciudad } from '../models/ubicacion';
import { CIUDADES } from '../mocks/ciudades.mock';

@Injectable({ providedIn: 'root' })
export class UbicacionService {

  /** Cuando exista el backend: return this.http.get<Ciudad[]>(...) */
  listarCiudades(): Observable<Ciudad[]> {
    return of(CIUDADES);
  }
}
