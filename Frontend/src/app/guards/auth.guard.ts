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
    // Redirigir de manera silenciosa y limpia según el rol correspondiente
    if (sesion.rol === 'cliente') {
      router.navigate(['/cliente/eventos']);
    } else if (sesion.rol === 'agente') {
      router.navigate(['/agente/eventos']);
    } else if (sesion.rol === 'administrador') {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/auth/login']);
    }
    return false;
  }

  return true;
};
