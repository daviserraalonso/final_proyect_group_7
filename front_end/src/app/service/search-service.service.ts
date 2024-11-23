import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private baseUrl: string = 'http://localhost:3000/api/users'
  private http = inject(HttpClient)

  constructor() { }

  search(params: HttpParams): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/search`, {params: params}))
  }

  getAllCategories(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl))
  }

  getTeachersName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/names`))
  }

  getCitiesName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/cities`))
  }

  getCityCords(city: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/${city}`))
  }



}
