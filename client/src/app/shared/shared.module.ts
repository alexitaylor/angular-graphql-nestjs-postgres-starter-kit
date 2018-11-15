import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, ValidationService } from './';
import { ControlMessagesComponent } from '@app/shared/validators/control-messages/control-messages.component';
import {ReversePipe} from '@app/shared/pipe/reverse.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ControlMessagesComponent, ReversePipe],
  providers: [ValidationService],
  exports: [LoaderComponent, ControlMessagesComponent, ReversePipe]
})
export class SharedModule {}
