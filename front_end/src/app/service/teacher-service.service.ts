// src/app/services/teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private baseUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getTeachersNames(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/users/names`));
  }
  getCategoryTeachers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/categories`));
  }
  // getRatingTeachers(): Promise<any[]> {
  //   return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/professors_ratings/ratings`));
  // }

  // getDescriptionTeachers(): Promise<any[]> {
  //   return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/${id}/details`));
  // }

}
