import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagesRoutingModule} from '@app/entities/messages/messages-routing.module';
import {MessagesComponent} from '@app/entities/messages/messages.component';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
