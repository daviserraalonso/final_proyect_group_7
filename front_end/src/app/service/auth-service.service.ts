import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users/login';

  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para verificar si localStorage está disponible
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Verifica si hay un token en localStorage
  private hasToken(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Devuelve el rol actual desde localStorage sin BehaviorSubject
  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('role');
    }
    return null;
  }

  // Método para iniciar sesión
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      tap(response => {
        if (response && response.token && response.user && response.user.role) {
          this.setSession(response);
        }
      })
    );
  }

  // Método para establecer la sesión y actualizar el estado de autenticación
  private setSession(authResult: any): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('user', JSON.stringify(authResult.user));
      localStorage.setItem('role', authResult.user.role);
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Método para cerrar sesión y limpiar el estado de autenticación
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Método público para verificar el estado de autenticación
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
