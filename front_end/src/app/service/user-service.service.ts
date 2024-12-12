import { inject, Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserAttributes } from '../interfaces/userAttributes';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: string = "http://localhost:3000/api/users";
  private apiUrl = 'http://localhost:3000/api/users';

  private http = inject(HttpClient)

  constructor(private dialog: MatDialog) {}

  getAll(): Promise<UserAttributes[]> {
    return firstValueFrom(this.http.get<UserAttributes[]>(this.baseUrl));
  }

  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teachers`);
  }

  getFavoriteTeachers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/teachers/favorites`));
  }

  getUserDetails(userId: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/${userId}/details`));
  }
  
  // function to get user by Id, url no complete
  getById(id: string): Promise<UserAttributes> {
    return firstValueFrom(this.http.get<UserAttributes>(this.baseUrl))
  }

  delete(userId: number): Promise<void> {
    const url = `http://localhost:3000/api/users/${userId}`;
    return firstValueFrom(this.http.delete<void>(url));
  }

  //function to update user, url no complete
  update(taskId: number, submission: string): Promise<any> {
    const url = `http://localhost:3000/api/tasks/${taskId}`;
    const body = { submission };
    return firstValueFrom(this.http.put<any>(url, body));
  }

  updateUser(userId: number, userData: any): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.baseUrl}/${userId}`, userData));
  }

  // function to create a new user, url no complete
  insert(body: UserAttributes): Promise<UserAttributes> {
    return firstValueFrom(this.http.post<UserAttributes>(`${this.baseUrl}/register`, body));
  }

  validate(id: number): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/${id}/validate`, null))
  }

  getTotalStudents(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/total-students`));
  }

  getTotalProfessors(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/total-professors`));
  }
}
