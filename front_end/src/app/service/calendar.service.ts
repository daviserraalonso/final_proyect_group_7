import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, throwError, catchError, map, of, tap } from 'rxjs';
import { ICourseEvent } from '../interfaces/iCourseEvent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = environment.apiUrl + '/course-event';

  constructor(private http: HttpClient) { }

  getCalendarEvents(): Observable<ICourseEvent[]> {
    console.log('Fetching all calendar events...');
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}`).pipe(
      tap(events => console.log('All events:', events)),
      catchError(this.handleError<ICourseEvent[]>('getCalendarEvents'))
    );
  }


  getEventsByProfessorId(professorId: number): Observable<ICourseEvent[]> {
    console.log(`Fetching events for professorId: ${professorId}`);
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}/professor/${professorId}/events`).pipe(
      tap(events => console.log('Professor events:', events)),
      catchError(this.handleError<ICourseEvent[]>('getEventsByProfessorId'))
    );
  }

  getEventsByStudentId(studentId: number): Observable<ICourseEvent[]> {
    console.log(`Fetching events for studentId: ${studentId}`);
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}/student/${studentId}/events`).pipe(
      tap(events => console.log('Student events:', events)),
      catchError(this.handleError<ICourseEvent[]>('getEventsByStudentId'))
    );
  }

  getCalendarEventById(eventId: number): Observable<ICourseEvent> {
    return this.http.get<ICourseEvent>(`${this.apiUrl}/${eventId}`).pipe(
      catchError(this.handleError<ICourseEvent>('getCalendarEventById'))
    );
  }


  getSubjectsByCourseId(courseId: number): Observable<any[]> {
    const url = `${this.apiUrl}/course/${courseId}/subjects`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        if (error.status === 404) {
          //if not subjects, subject array = clear
          console.warn(`No se encontraron asignaturas para el curso ${courseId}:`, error.message);
          return of([]);
        }
        return throwError(() => new Error(`Error en getSubjectsByCourseId: ${error.message}`));
      })
    );
  }

  getCoursesByProfessorId(professorId: number): Observable<ICourseEvent[]> {
    const url = `${this.apiUrl}/professor/${professorId}`;
    return this.http.get<ICourseEvent[]>(url).pipe(
      catchError(this.handleError<ICourseEvent[]>('getCoursesByProfessorId'))
    );
  }



  createCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.post<ICourseEvent>(`${this.apiUrl}`, event).pipe(
      catchError(this.handleError<ICourseEvent>('createCalendarEvent'))
    );
  }


  updateCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.put<ICourseEvent>(`${this.apiUrl}/${event.id}`, event).pipe(
      catchError(this.handleError<ICourseEvent>('updateCalendarEvent'))
    );
  }

  deleteCalendarEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`).pipe(
      catchError(this.handleError<void>('deleteCalendarEvent'))
    );
  }

  getCourseLocation(locationId: number): Observable<{ address: string; onlineLink?: string }> {
    return this.http.get<{ address: string; onlineLink?: string }>(`${this.apiUrl}/location/${locationId}`).pipe(
      catchError((error) => {
        console.error(`Error en getCourseLocation:`, error);
        return of({ address: '', onlineLink: '' });
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`Error en ${operation}: ${error.message}`));
    };
  }



}
