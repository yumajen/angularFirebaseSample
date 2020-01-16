import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      { path: '', redirectTo: '/chat', pathMatch: 'full' },
      { path: 'chat', component: ChatComponent },
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
