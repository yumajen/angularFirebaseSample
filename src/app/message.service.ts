import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'api/messages';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url);
    // エラーハンドリングは省略
  }

  postMessages(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message, this.httpOptions);
    // エラーハンドリングは省略
  }

}
