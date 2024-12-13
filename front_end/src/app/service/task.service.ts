import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { Task } from '../interfaces/itask';
import { environment } from '../../environments/environment';

export interface TaskUpdate {
  id?: number;
  subjectId?: number;
  userId?: number;
  comments?: string;
  punctuation?: number;
  submission?: string;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl + 'tasks'; // URL de la API
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await lastValueFrom(this.http.get<Task[]>(this.apiUrl));
      return response;
    } catch (error) {
      this.handleError<Task[]>('getAllTasks', []);
      throw error;
    }
  }

  // Obtener todas las tareas por ID de usuario
  async getTasksByUserId(userId: number): Promise<Task[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    try {
      const response = await lastValueFrom(this.http.get<Task[]>(url));
      return response;
    } catch (error) {
      this.handleError<Task[]>(`getTasksByUserId userId=${userId}`);
      throw error;
    }
  }

  // Obtener una tarea por ID
  async getTaskById(id: number): Promise<Task> {
    const url = `${this.apiUrl}/${id}`;
    try {
      const response = await lastValueFrom(this.http.get<Task>(url));
      return response;
    } catch (error) {
      this.handleError<Task>(`getTaskById id=${id}`);
      throw error;
    }
  }

  // Crear una nueva tarea por id del alumno
  async createTask(task: { studentId: number, subjectId: number, comments: string, deadline: string }): Promise<any> {
    const url = `${this.apiUrl}/assign`;
    try {
      const response = await lastValueFrom(this.http.post<any>(url, task, this.httpOptions));
      return response;
    } catch (error) {
      this.handleError<any>('createTask');
      throw error;
    }
  }

  // Actualizar una tarea por ID
  async updateTask(taskId: number, data: TaskUpdate): Promise<any> {
    console.log('Enviando solicitud PUT a:', `${this.apiUrl}/${taskId}`, 'con datos:', JSON.stringify(data)); // Añadir log para verificar la solicitud
    try {
      const response = await lastValueFrom(this.http.put<any>(`${this.apiUrl}/${taskId}`, data, this.httpOptions));
      return response;
    } catch (error) {
      this.handleError<any>('updateTask');
      throw error;
    }
  }

  // Eliminar una tarea por ID
  async deleteTask(id: number): Promise<Task> {
    const url = `${this.apiUrl}/${id}`;
    try {
      const response = await lastValueFrom(this.http.delete<Task>(url, this.httpOptions));
      return response;
    } catch (error) {
      this.handleError<Task>('deleteTask');
      throw error;
    }
  }

  // Enviar retroalimentación de la tarea
  async submitFeedback(taskId: number, feedback: { punctuation: number, submission: string, feedback: string }): Promise<any> {
    const url = `${this.apiUrl}/${taskId}/feedback`;
    try {
      const response = await lastValueFrom(this.http.post<any>(url, feedback, this.httpOptions));
      return response;
    } catch (error) {
      this.handleError<any>('submitFeedback');
      throw error;
    }
  }
}