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
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable público

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
  private setSession(authResult: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('user', JSON.stringify(authResult.user));
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
