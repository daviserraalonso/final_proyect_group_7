import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, throwError, catchError, map, of, tap } from 'rxjs';
import { ICourseEvent } from '../interfaces/iCourseEvent';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/api/course-event'; // Base URL para la API del calendario

  constructor(private http: HttpClient) { }

  getCalendarEvents(): Observable<ICourseEvent[]> {
    console.log('Fetching all calendar events...');
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}`).pipe(
      tap(events => console.log('All events:', events)), // Log de eventos
      catchError(this.handleError<ICourseEvent[]>('getCalendarEvents'))
    );
  }


  getEventsByProfessorId(professorId: number): Observable<ICourseEvent[]> {
    console.log(`Fetching events for professorId: ${professorId}`);
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}/professor/${professorId}/events`).pipe(
      tap(events => console.log('Professor events:', events)), // Log de eventos
      catchError(this.handleError<ICourseEvent[]>('getEventsByProfessorId'))
    );
  }

  getEventsByStudentId(studentId: number): Observable<ICourseEvent[]> {
    console.log(`Fetching events for studentId: ${studentId}`);
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}/student/${studentId}/events`).pipe(
      tap(events => console.log('Student events:', events)), // Log de eventos
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
          // Si no hay asignaturas, devolvemos un array vacío
          console.warn(`No se encontraron asignaturas para el curso ${courseId}:`, error.message);
          return of([]); // Devuelve un observable con un array vacío
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
        return of({ address: '', onlineLink: '' }); // Devuelve un objeto vacío si hay error
      })
    );
  }

  //Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`Error en ${operation}: ${error.message}`));
    };
  }

  //Método auxiliar para validar campos obligatorios
  private isEventValid(event: ICourseEvent): boolean {
    if (!event.title) throw new Error('El título es obligatorio.');
    if (!event.startDateTime) throw new Error('La fecha de inicio es obligatoria.');
    if (!event.endDateTime) throw new Error('La fecha de fin es obligatoria.');
    if (event.allDay === undefined) throw new Error('El campo "allDay" es obligatorio.');
    if (!event.locationType) throw new Error('El tipo de ubicación es obligatorio.');
    if (event.isRead === undefined) throw new Error('El campo "isRead" es obligatorio.');
    if (!event.courseId) throw new Error('El ID del curso es obligatorio.');
    if (!event.subjectId) throw new Error('El ID de la materia es obligatorio.');
    if (!event.professorId) throw new Error('El ID del profesor es obligatorio.');

    return true;
  }


}
