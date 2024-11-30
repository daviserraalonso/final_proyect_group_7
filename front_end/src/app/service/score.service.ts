import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl: string = "http://localhost:3000/api/score"
  private http = inject(HttpClient)

  insertScore(body: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(this.baseUrl, body))
    
  }

}


