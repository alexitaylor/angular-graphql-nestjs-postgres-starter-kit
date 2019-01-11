import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagesRoutingModule} from '@app/entities/messages/messages-routing.module';
import {MessagesComponent} from '@app/entities/messages/messages.component';
import {
  MessagesCreateDialogComponent,
  MessagesCreatePopupComponent
} from '@app/entities/messages/messages-create-dialog/messages-create-dialog.component';
import {SharedModule} from '@app/shared';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MessagesDeleteDialogComponent,
  MessagesDeletePopupComponent
} from '@app/entities/messages/messages-delete-dialog/messages-delete-dialog.component';
import {MessagesUpdateComponent} from '@app/entities/messages/messages-update/messages-update.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesRoutingModule
  ],
  declarations: [
    MessagesComponent,
    MessagesCreateDialogComponent,
    MessagesCreatePopupComponent,
    MessagesDeleteDialogComponent,
    MessagesDeletePopupComponent,
    MessagesUpdateComponent,
  ],
})
export class MessagesModule { }
