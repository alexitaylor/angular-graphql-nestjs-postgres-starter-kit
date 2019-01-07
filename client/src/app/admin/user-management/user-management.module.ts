import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementUpdateComponent } from './user-management-update/user-management-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  UserManagementDeleteDialogComponent,
  UserManagementDeletePopupComponent
} from '@app/admin/user-management/user-management-delete-dialog/user-management-delete-dialog.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SharedModule, UserManagementRoutingModule, FormsModule],
  declarations: [UserManagementComponent, UserManagementUpdateComponent, UserManagementDeleteDialogComponent, UserManagementDeletePopupComponent],
  entryComponents: [UserManagementDeleteDialogComponent, UserManagementDeletePopupComponent]
})
export class UserManagementModule {}
