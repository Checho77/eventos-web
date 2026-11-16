import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el backend devuelve 401 (token expirado o inválido) y la petición no es login ni registro
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/registro')) {
        usuarioService.cerrarSesion();
        router.navigate(['/auth/login'], { queryParams: { expirada: 'true' } });
      }
      return throwError(() => error);
    })
  );
};
