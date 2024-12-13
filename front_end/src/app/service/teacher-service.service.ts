import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IstudentResponse } from '../interfaces/istudent-response';
import { IStudent } from '../interfaces/iStudent';
import { IPendingTask } from '../interfaces/ipending-task';
import { ITaskDetails } from '../interfaces/itask-details'; // Asegúrate de tener esta interfaz definida
import { ITaskCounts } from '../interfaces/itask-counts'; // Asegúrate de tener esta interfaz definida
import { IStudentCount } from '../interfaces/istudent-count';
import { IEarnings } from '../interfaces/iearnings';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getStudentsByProfessorId(professorId: number) {
    return lastValueFrom(this.httpClient.get<IStudent[]>(`${this.baseUrl}/professors/${professorId}/students`));
  }

  getPendingTasks(professorId: number) {
    return lastValueFrom(this.httpClient.get<IPendingTask[]>(`${this.baseUrl}/tasks/profesor/${professorId}/pending-tasks`));
  }

  getTaskDetails(taskId: number) {
    return lastValueFrom(this.httpClient.get<ITaskDetails>(`${this.baseUrl}/tasks/details/${taskId}`));
  }

  getTaskCounts(professorId: number) {
    return lastValueFrom(this.httpClient.get<ITaskCounts>(`${this.baseUrl}/tasks/counts/${professorId}`));
  }

  getStudentCount(professorId: number) {
    return lastValueFrom(this.httpClient.get<IStudentCount>(`${this.baseUrl}/tasks/profesor/${professorId}/student-count`));
  }

  getEarnings(professorId: number) {
    return lastValueFrom(this.httpClient.get<IEarnings[]>(`${this.baseUrl}/tasks/profesor/${professorId}/earnings`));
  }
}

