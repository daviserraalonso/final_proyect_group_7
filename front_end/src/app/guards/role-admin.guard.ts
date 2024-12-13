import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
              Swal.fire({
                text: 'No tienes permiso para acceder a esta página',
                width: 400,
                showConfirmButton: false,
                icon: 'warning',
                imageHeight: 80,
                imageWidth: 60,
                timer: 4000
              });
    return false;
  };

