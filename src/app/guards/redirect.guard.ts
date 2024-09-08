import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const code = authService.getCode();
  console.log(code);
  if (code) {
    router.navigate(['']);
    return false;
  }
  return true;
};
