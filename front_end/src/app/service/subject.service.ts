import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubject } from '../interfaces/ISubject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/api/subjects';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(this.apiUrl);
  }

  getSubjectById(id: number): Observable<ISubject> {
    return this.http.get<ISubject>(`${this.apiUrl}/${id}`);
  }

  createSubject(subject: ISubject): Observable<ISubject> {
    return this.http.post<ISubject>(this.apiUrl, subject);
  }

  updateSubject(subject: ISubject): Observable<ISubject> {
    return this.http.put<ISubject>(`${this.apiUrl}/${subject.id}`, subject);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
