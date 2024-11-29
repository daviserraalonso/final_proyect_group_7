import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademicOfferingsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getPresentialCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/presential`);
  }

  getOnlineCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/online`);
  }
}
