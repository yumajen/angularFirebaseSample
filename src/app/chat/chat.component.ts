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
      .subscribe(massages => {
        this.messages = massages;
        this.numberOfMessages = massages.length;
      });
  }

  postMessage(): void {
    this.messageService.postMessages(this.form.value as Message)
    // .subscribe(() => {
    //   this.getMessages();
    //   this.form.reset();
    // });
  }
}
