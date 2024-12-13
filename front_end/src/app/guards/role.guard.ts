import { CanActivateFn } from '@angular/router';

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
  alert('No tienes permiso para acceder a esta página');
  return false;
};
