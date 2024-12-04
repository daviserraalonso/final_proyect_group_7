import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { ProgressResponse } from '../interfaces/iProgressResponse';

type TaskResponse = {
  tarea_id: number; // ID de la tarea
  tarea_comentarios: string; // Comentarios sobre la tarea
  materia_nombre: string; // Nombre de la materia
  profesor_nombre: string; // Nombre del profesor
};



@Injectable({
  providedIn: 'root'
})
export class DashboardStudentService {

  private baseUrl: string = `${environment.API_URL}tasks`;

  private httpClient = inject(HttpClient);

  // get task by user
  getTasksByUserId(userId: number) {
    return lastValueFrom(this.httpClient.get<TaskResponse[]>(`${this.baseUrl}/user/${userId}`));
  }

  // get progress by user and subject
  getProgressByUserId(userId: number) {
    return lastValueFrom(this.httpClient.get<ProgressResponse[]>(`${this.baseUrl}/progress/${userId}`));
  }
}