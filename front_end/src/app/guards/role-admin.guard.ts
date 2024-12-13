import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);

        // check if user it authoriced
        if (user.role === 1) {
          return true;
        }
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
      }
    }

    // redirect if not have access
    alert('No tienes permiso para acceder a esta página');
    return false;
  };

