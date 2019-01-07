import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from './messages/messages.module';
import {EntityRoutingModule} from '@app/entities/entity-routing.module';
import {ShellModule} from '@app/shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    ShellModule,
    MessagesModule,
    EntityRoutingModule
  ],
  declarations: [],
})
export class EntityModule { }
