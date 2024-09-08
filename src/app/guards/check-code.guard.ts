import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const checkCodeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const code = authService.getCode();
  if (!code) {
    router.navigate(['code']); // Asegúrate de no usar una barra inicial
    return false;
  }
  return true;
};
