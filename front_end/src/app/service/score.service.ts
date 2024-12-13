import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Comments } from '../components/common/comments/comments.component';
import { ScoreValid } from '../components/dashboard/student/student-courses/student-courses.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl: string = environment.apiUrl + '/score'
  private http = inject(HttpClient)

  insertScore(body: any): Promise<number> {
    return firstValueFrom(this.http.post<number>(this.baseUrl, body))
  }

  getScoreByIds(params: HttpParams): Promise<ScoreValid> {
    return firstValueFrom(this.http.get<ScoreValid>(this.baseUrl, { params: params }))
  }
  getComments(userId: number): Promise<Comments[]> {
    return firstValueFrom(this.http.get<Comments[]>(`${this.baseUrl}/${userId}/comments`))
  }

}


