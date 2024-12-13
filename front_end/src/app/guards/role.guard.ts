import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (route, state) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);

      // get roles authoriced
      const allowedRoles: number[] = route.data?.['roles'];

      if (allowedRoles && allowedRoles.includes(user.role)) {
        return true;
      }
    } catch (error) {
      console.error('Error al parsear el usuario:', error);
    }
  }

  //redirect if haven´t got access
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
