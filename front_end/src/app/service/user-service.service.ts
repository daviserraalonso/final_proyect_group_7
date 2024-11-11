import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserAttributes } from '../interfaces/userAttributes';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: string = "http://localhost:3000/api/users/register" // pending to put the final url
  private http = inject(HttpClient)

  constructor() { }


  // function to get user by Id, url no complete
  getById(id: string): Promise<UserAttributes> {
    return firstValueFrom(this.http.get<UserAttributes>(this.baseUrl))
  }
  //function to update user, url no complete
  update(body: UserAttributes): Promise<UserAttributes> {
    return firstValueFrom(this.http.put<UserAttributes>(this.baseUrl, body));
  }

  // function to create a new user, url no complete
  insert(body: UserAttributes): Promise<UserAttributes> {
    return firstValueFrom(this.http.post<UserAttributes>(this.baseUrl, body));
  }

}
