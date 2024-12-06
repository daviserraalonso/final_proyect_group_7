import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private apiUrl = 'http://localhost:3000/api/student-courses';

  constructor(private http: HttpClient) {}

  getStudentCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }






inscription(inscription: any): Promise<any> {
  return firstValueFrom(this.http.post<any>(`${this.apiUrl}/inscription`, inscription))
}



}
