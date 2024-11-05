import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users/login'; // Ruta al backend

  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // esto hace que el BehaviorSubject sea observable y la funcion isAuthenticated$ es la que se va a suscribir en el componente para saber si el usuario esta autenticado o no

  constructor(private http: HttpClient) {}

  // Método para verificar si hay un token en localStorage
  private hasToken(): boolean {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
     
    return !!token;
  }

  // Método para iniciar sesión
  login(data: any): Observable<any> {
    console.log('Enviando solicitud a:', this.apiUrl);
    console.log('Datos de la solicitud:', data);
    return this.http.post<any>(this.apiUrl, data).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response);
        }
      })
    );
  }

  // Método para establecer la sesión
  private setSession(authResult: any): void {  // authResult es la respuesta del servidor
    if (typeof window !== 'undefined') { // Verificar si estamos en el navegador
      localStorage.setItem('token', authResult.token); // Almacenar el token en localStorage
      localStorage.setItem('user', JSON.stringify(authResult.user)); // Almacenar la información del usuario en localStorage
      this.isAuthenticatedSubject.next(true); // Actualizar el estado de autenticación
    }
  }

  // Método para cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isAuthenticatedSubject.next(false); // Actualizar el estado de autenticación
    }
  }
}
