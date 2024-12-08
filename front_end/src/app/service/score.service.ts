import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Comments } from '../components/common/comments/comments.component';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl: string = "http://localhost:3000/api/score"
  private http = inject(HttpClient)

  insertScore(body: any): Promise<number> {
    return firstValueFrom(this.http.post<number>(this.baseUrl, body))
  }

  getScoreByIds(params: HttpParams): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.baseUrl, {params: params}))
  }
  getComments(userId: number): Promise<Comments[]> {
    return firstValueFrom(this.http.get<Comments[]>(`${this.baseUrl}/${userId}/comments`))
  }

}


