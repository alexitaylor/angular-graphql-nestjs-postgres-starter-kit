import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, ValidationService, ControlMessagesComponent } from './';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ControlMessagesComponent],
  providers: [ValidationService],
  exports: [LoaderComponent, ControlMessagesComponent]
})
export class SharedModule {}
