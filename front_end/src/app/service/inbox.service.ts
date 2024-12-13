import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private apiUrl = environment.apiUrl + 'chats';
  private baseUrl: string = environment.apiUrl + 'users';
  private chatRoutes: string = environment.apiUrl + 'chats';

  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}`));
  }

  getMessages(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  /**
   * FUNCTION TO SEND MESSAGE TO CHAT
   * 
   * @param chatId 
   * @param userId 
   * @param content 
   * @returns 
   */
  sendMessage(chatId: number, userId: number, content: string): Promise<void> {
    const url = `${this.apiUrl}/${chatId}/message`;
    return firstValueFrom(this.http.post<void>(url, { userId, content }));
  }

  /**
   * SEND MENSSAGE TO USER
   * 
   * @param userId 
   * @param content 
   * @returns 
   */
  sendMessageToUser(userId: number, content: string): Promise<void> {
    const url = `${this.chatRoutes}/${userId}/message`;
    return firstValueFrom(this.http.post<void>(url, { content }));
  }



  /**
   * INITIALIZE NEW CHAT WITH NEW USER
   * 
   * @param userId 
   * @param content 
   * @returns 
   */
  createNewChat(userId: number, creatorId: number, content: string): Promise<any> {
    const url = `${this.chatRoutes}/${userId}/new-chat`;
    return firstValueFrom(this.http.post<any>(url, { creatorId, content }));
  }
}
