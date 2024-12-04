import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IstudentResponse } from '../interfaces/istudent-response';
import { IStudent } from '../interfaces/iStudent';



@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  getStudentsByProfessorId(professorId: number) {
    return lastValueFrom(this.httpClient.get<IStudent[]>(`${this.baseUrl}/professors/${professorId}/students`));
  }
}
