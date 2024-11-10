import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private baseUrl: string = ""
  private http = inject(HttpClient)

  constructor() { }

  search(body: any): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl, body))
  }

  getAllCategories(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl))
  }

  getTeachersName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl))
  }

  getCitiesName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl))
  }


}
