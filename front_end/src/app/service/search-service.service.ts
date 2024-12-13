import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private baseUrl: string = environment.apiUrl + '/api/'
  private http = inject(HttpClient)

  constructor() { }

  search(params: HttpParams): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/users/search`, { params: params }))
  }

  getTeachersName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/users/names`))
  }

  getCitiesName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/users/cities`))
  }

  getCityCords(city: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.baseUrl}/users/${city}`))
  }

  getAllCategories(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/categories`))
  }

  getAllModalities(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/modalities`))
  }


}
