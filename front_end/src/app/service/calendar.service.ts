import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourseEvent } from '../interfaces/iCourseEvent';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/api/course-event'; // Base URL para la API del calendario

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los eventos del calendario.
   */
  getCalendarEvents(): Observable<ICourseEvent[]> {
    return this.http.get<ICourseEvent[]>(`${this.apiUrl}`);
  }

  /**
   * Obtiene un evento del calendario por su ID.
   * @param id - ID del evento a obtener
   */
  getCalendarEventById(id: number): Observable<ICourseEvent> {
    return this.http.get<ICourseEvent>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo evento en el calendario.
   * @param event - Objeto del evento a crear
   */
  createCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.post<ICourseEvent>(`${this.apiUrl}`, event);
  }

  /**
   * Actualiza un evento del calendario existente.
   * @param event - Objeto del evento con los cambios a realizar
   */
  updateCalendarEvent(event: ICourseEvent): Observable<ICourseEvent> {
    return this.http.put<ICourseEvent>(`${this.apiUrl}/${event.id}`, event);
  }

  /**
   * Elimina un evento del calendario por su ID.
   * @param eventId - ID del evento a eliminar
   */
  deleteCalendarEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  /**
   * Obtiene cursos por profesor basado en el encabezado `user`.
   */
  getCoursesByProfessor(): Observable<any> {
    const user = localStorage.getItem('user'); // Obtén los datos del usuario desde localStorage
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser || !parsedUser.id) {
      throw new Error('No se encontró información válida del usuario en localStorage.');
    }

    // Realiza la solicitud GET al servidor sin pasar el encabezado 'user'
    return this.http.get(`${this.apiUrl}/courses-by-professor`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
