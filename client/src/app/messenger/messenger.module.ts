import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import {MessengerRoutingModule} from 'app/messenger/messenger-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MessengerRoutingModule,
  ],
  declarations: [MessengerComponent],
})
export class MessengerModule { }
