import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from '@app/entities/roles/roles-routing.module';
import { RolesComponent } from '@app/entities/roles/roles.component';
import { RolesUpdateComponent } from './roles-update/roles-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import {
  RolesCreateDialogComponent,
  RolesCreatePopupComponent
} from '@app/entities/roles/roles-create-dialog/roles-create-dialog.component';
import {
  RolesDeleteDialogComponent,
  RolesDeletePopupComponent
} from '@app/entities/roles/roles-delete-dialog/roles-delete-dialog.component';

@NgModule({
  imports: [CommonModule, SharedModule, TranslateModule, ReactiveFormsModule, FormsModule, RolesRoutingModule],
  declarations: [
    RolesComponent,
    RolesUpdateComponent,
    RolesCreateDialogComponent,
    RolesCreatePopupComponent,
    RolesDeleteDialogComponent,
    RolesDeletePopupComponent
  ]
})
export class RolesModule {}
