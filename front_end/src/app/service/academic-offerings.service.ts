import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AcademicOfferingsService {
  private apiUrl = environment.apiUrl + 'courses';

  constructor(private http: HttpClient) { }

  getPresentialCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/presential`);
  }

  getOnlineCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/online`);
  }
}
