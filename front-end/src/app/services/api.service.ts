import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Método para obtener la versión de Node.js
  getNodeVersion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/node-version`);
  }
}
