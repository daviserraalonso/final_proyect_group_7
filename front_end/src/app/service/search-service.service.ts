import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private baseUrl: string = this.normalizeUrl(environment.apiUrl);
  private http = inject(HttpClient);

  constructor() { }

  private normalizeUrl(url: string): string {
    return url
      .replace(/\/api\/+/g, '/api/')
  }

  private buildUrl(endpoint: string): string {
    return this.normalizeUrl(`${this.baseUrl}/${endpoint}`);
  }

  search(params: HttpParams): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl('users/search'), { params }));
  }

  getTeachersName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl('users/names')));
  }

  getCitiesName(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl('users/cities')));
  }

  getCityCords(city: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl(`users/${city}`)));
  }

  getAllCategories(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl('categories')));
  }

  getAllModalities(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.buildUrl('modalities')));
  }
}
