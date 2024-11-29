import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourseEvent } from '../interfaces/iCourseEvent';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los eventos del calendario.
   */
  getCalendarEvents(): Observable<ICourseEvent[]> {
    return this.http.get<ICourseEvent[]>((`${this.apiUrl}course-event`));
  }

  /**
   * Obtiene un evento del calendario por su ID.
   */
  getCalendarEventById(id: number): Observable<ICourseEvent> {
    return this.http.get<ICourseEvent>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo evento en el calendario.
   */
  createCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.post<ICourseEvent>(this.apiUrl, event);
  }

  /**
   * Actualiza un evento del calendario existente.
   */
  updateCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.put<ICourseEvent>(
      `${this.apiUrl}/${event.id}`,
      event
    );
  }

  /**
   * Elimina un evento del calendario por su ID.
   */
  deleteCalendarEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
