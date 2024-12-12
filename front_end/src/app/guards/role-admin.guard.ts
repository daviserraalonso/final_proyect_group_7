import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);

        // Verificar si el usuario tiene el rol permitido
        if (user.role === 1) {
          return true; // Permitir acceso
        }
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
      }
    }

    // Redirigir si no tiene acceso
   router.navigate(['/access-denied']);
    return false;
  };

