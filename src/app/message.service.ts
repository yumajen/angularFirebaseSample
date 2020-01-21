import { Injectable } from '@angular/core';
// import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // private url = 'api/messages';
  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(
    // private http: HttpClient,
    private db: AngularFirestore,
  ) { }

  getMessages(): Observable<any[]> {
    // messagesコレクションのリファレンス
    const messagesRef = this.db.collection('messages');
    return messagesRef.valueChanges();
    // return this.http.get<Message[]>(this.url);
    // エラーハンドリングは省略
  }

  postMessages(message: Message) {
    // messagesコレクションのリファレンス
    const messagesRef = this.db.collection('messages');
    messagesRef.add(message);
    // return this.http.post<Message>(this.url, message, this.httpOptions);
    // エラーハンドリングは省略
  }
}
