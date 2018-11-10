import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, UserManagementRoutingModule],
  declarations: [UserManagementComponent]
})
export class UserManagementModule {}
