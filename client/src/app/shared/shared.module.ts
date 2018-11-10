import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, ValidationService } from './';
import { ControlMessagesComponent } from '@app/shared/validators/control-messages/control-messages.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ControlMessagesComponent],
  providers: [ValidationService],
  exports: [LoaderComponent, ControlMessagesComponent]
})
export class SharedModule {}
