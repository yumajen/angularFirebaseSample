import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './message';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // messagesコレクション、ドキュメントのリファレンス
  private messagesCollection: AngularFirestoreCollection<Message>

  constructor(
    private db: AngularFirestore,
  ) {
    // orderBy()などのクエリを使用することも可能
    this.messagesCollection = db.collection<Message>('messages', ref => ref.orderBy('createdAt', 'desc'));
  }

  getMessages(): Observable<Message[]> {
    return this.messagesCollection.valueChanges();
  }

  createMessages(param: Message): Promise<void> {
    // idを自動生成するメソッドのcreatedId()を使用
    const id = this.db.createId();
    const item: Message = {
      id,
      contents: param.contents,
      createdAt: Date.now(),
    }
    return this.messagesCollection.doc(id).set(item)
  }

  updateMessage(param: Message): Promise<void> {
    return this.messagesCollection.doc(param.id).update(param);
  }

  deleteMessage(param: Message): Promise<void> {
    return this.messagesCollection.doc(param.id).delete();
  }
}
