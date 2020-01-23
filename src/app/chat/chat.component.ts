import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  numberOfMessages: number = 0;
  editingMessage: Message; // 編集中のメッセージ
  updateParam: any = {};
  form = this.fb.group({
    contents: [''],
  });

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages()
      .subscribe(messages => {
        this.messages = messages;
        this.numberOfMessages = messages.length;
      });
  }

  createMessage(): void {
    this.messageService.createMessages(this.form.value as Message)
      .then(() => {
        this.form.reset();
      })
      .catch((error: Error) => {
        console.log('Post error', error);
      });
  }

  editMessage(message: Message): void {
    this.editingMessage = message;
  }

  isEdit(message: Message): boolean {
    if (!this.editingMessage) { return; }
    return this.editingMessage.id == message.id;
  }

  setUpdateParam(message: Message, value: string) {
    this.updateParam = Object.assign({}, message);
    this.updateParam['contents'] = value;
  }

  cancelEditing(): void {
    this.updateParam = {};
    this.editingMessage = null;
  }

  updateMessage(message: Message): void {
    if (message.id != this.updateParam.id) {
      this.cancelEditing();
      return;
    }
    if (this.updateParam == {}) {
      this.cancelEditing();
      return;
    }
    this.messageService.updateMessage(this.updateParam as Message)
      .then(() => {
        this.cancelEditing();
      })
      .catch((error: Error) => {
        console.log('Update error', error);
      });
  }

  deleteMessage(message: Message): void {
    this.messageService.deleteMessage(message)
      .then(() => { })
      .catch((error: Error) => {
        console.log('Delete error', error);
      });
    ;
  }
}
