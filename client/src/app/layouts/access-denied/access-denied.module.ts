import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied.component';
import { AccessDeniedRoutingModule } from '@app/layouts/access-denied/access-denied-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, AccessDeniedRoutingModule],
  declarations: [AccessDeniedComponent]
})
export class AccessDeniedModule {}
