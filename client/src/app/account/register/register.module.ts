import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {SharedModule} from '@app/shared';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, RegisterRoutingModule, SharedModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
