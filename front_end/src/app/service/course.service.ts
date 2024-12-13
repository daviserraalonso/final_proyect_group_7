import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { ICourse } from '../interfaces/iCourse';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = environment.apiUrl + '/courses';
  private categoriesUrl = environment.apiUrl + '/categories';
  private modalitiesUrl = environment.apiUrl + '/modalities';
  private coursesUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<{ id: number; name: string }> {
    return this.http.get<{ id: number; name: string }>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: { name: string }): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string, price: number }>(this.apiUrl, course);
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

  getCourseDetails(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.coursesUrl}/course/${courseId}`);
  }

  getUserSubscribedCourses(userId: number): Observable<{ courses: ICourse[] }> {
    return this.http.get<{ courses: ICourse[] }>(`${this.coursesUrl}/users/${userId}/courses`);
  }

  getTotalCourses(): Promise<any> {
    return lastValueFrom(this.http.get<number>(`${this.apiUrl}/total`));
  }
}

