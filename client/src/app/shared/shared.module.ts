import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, ValidationService } from './';
import { ControlMessagesComponent } from '@app/shared/validators/control-messages/control-messages.component';
import {ReversePipe} from '@app/shared/pipe/reverse.pipe';
import { HasAnyAuthorityDirective } from './has-any-authority/has-any-authority.directive';
import {FormatDatePipe} from '@app/shared/pipe/format-date.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoaderComponent,
    ControlMessagesComponent,
    ReversePipe,
    FormatDatePipe,
    HasAnyAuthorityDirective,
  ],
  providers: [ValidationService],
  exports: [
    LoaderComponent,
    ControlMessagesComponent,
    ReversePipe,
    FormatDatePipe,
    HasAnyAuthorityDirective,
  ]
})
export class SharedModule {}
