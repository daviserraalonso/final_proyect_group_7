import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private categoriesUrl = 'http://localhost:3000/api/categories';
  private modalitiesUrl = 'http://localhost:3000/api/modalities';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<{ id: number; name: string }> {
    return this.http.get<{ id: number; name: string }>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: { name: string }): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.apiUrl, course);
  }
  updateCourse(id: number, course: { name: string }): Observable<{ id: number; name: string }> {
    return this.http.put<{ id: number; name: string }>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getModalities(): Observable<any[]> {
    return this.http.get<any[]>(this.modalitiesUrl);
  }
}
