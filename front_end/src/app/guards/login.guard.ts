import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }
  Swal.fire({
    title: 'Error',
    text: 'No autorizado',
    icon: 'warning',
    confirmButtonText: 'Ok'
  });
  
  router.navigate(['/login']);

  return false;
};

