import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contact/send-email';

  constructor(private http: HttpClient) {}

  sendContactForm(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
