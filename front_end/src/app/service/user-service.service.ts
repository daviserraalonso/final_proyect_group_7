import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: string = "" // pending to put the final url
  private http = inject(HttpClient)

  constructor() { }


// function to get user by Id, url no complete
  getById(id: string): Promise<Iuser> {
    return firstValueFrom(this.http.get<Iuser>(this.baseUrl))
  }
//function to update user, url no complete
  update(body: Iuser): Promise<Iuser> {
    return firstValueFrom(this.http.put<Iuser>(this.baseUrl, body));
  }

  // function to create a new user, url no complete
  insert(body: Iuser): Promise<Iuser> {
    return firstValueFrom(this.http.post<Iuser>(this.baseUrl, body));
  }
}
