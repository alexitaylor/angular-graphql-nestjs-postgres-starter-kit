import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SharedModule} from '@app/shared';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, LoginRoutingModule, SharedModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
