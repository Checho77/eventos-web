import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.estaAutenticado()) {
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const rolGuard: CanActivateFn = (route, _state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const rolesPermitidos = route.data?.['roles'] as string[];
  const sesion = usuarioService.obtenerSesion();

  if (!sesion) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(sesion.rol)) {
    alert(`Acceso denegado: esta vista es exclusiva para el rol ${rolesPermitidos.join(' o ')}.`);
    if (sesion.rol === 'cliente') router.navigate(['/cliente/eventos']);
    else if (sesion.rol === 'agente') router.navigate(['/agente/eventos']);
    else router.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
