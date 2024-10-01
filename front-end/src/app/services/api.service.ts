import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url to server nodejs
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // method to get nodeVersion
  getNodeVersion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/node-version`);
  }
}
