import { Injectable } from '@angular/core';
import { Administrador, Agente, Cliente } from '../models/persona';
import { ADMINISTRADORES, AGENTES, CLIENTES } from '../mocks/personas.mock';

/**
 * Simula la sesión del usuario. Todavía no hay autenticación real,
 * por eso se toma siempre el primer usuario de cada perfil.
 */
@Injectable({ providedIn: 'root' })
export class UsuarioService {

  clienteActual(): Cliente {
    return CLIENTES[0];
  }

  agenteActual(): Agente {
    return AGENTES[0];
  }

  administradorActual(): Administrador {
    return ADMINISTRADORES[0];
  }
}
