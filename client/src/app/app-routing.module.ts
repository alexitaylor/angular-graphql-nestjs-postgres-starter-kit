import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import {
  UserManagementDeleteDialogComponent,
  UserManagementDeletePopupComponent
} from '@app/admin/user-management/user-management-delete-dialog/user-management-delete-dialog.component';
import {
  UserManagementCreateDialogComponent,
  UserManagementCreatePopupComponent
} from '@app/admin/user-management/user-management-create-dialog/user-management-create-dialog.component';
import {
  RolesCreateDialogComponent,
  RolesCreatePopupComponent
} from '@app/entities/roles/roles-create-dialog/roles-create-dialog.component';
import {
  RolesDeleteDialogComponent,
  RolesDeletePopupComponent
} from '@app/entities/roles/roles-delete-dialog/roles-delete-dialog.component';
import {
  MessagesCreateDialogComponent,
  MessagesCreatePopupComponent
} from '@app/entities/messages/messages-create-dialog/messages-create-dialog.component';
import {
  MessagesDeleteDialogComponent,
  MessagesDeletePopupComponent
} from '@app/entities/messages/messages-delete-dialog/messages-delete-dialog.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'users-management', loadChildren: 'app/admin/users-management/users-management.module#UserManagementModule' },
    { path: 'access-denied', loadChildren: 'app/layouts/access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'messenger', loadChildren: 'app/messenger/messenger.module#MessengerModule' },
    { path: 'entities', loadChildren: 'app/entities/entity.module#EntityModule' },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  entryComponents: [
    UserManagementDeleteDialogComponent,
    UserManagementDeletePopupComponent,
    UserManagementCreateDialogComponent,
    UserManagementCreatePopupComponent,
    RolesCreateDialogComponent,
    RolesCreatePopupComponent,
    RolesDeleteDialogComponent,
    RolesDeletePopupComponent,
    MessagesCreateDialogComponent,
    MessagesCreatePopupComponent,
    MessagesDeleteDialogComponent,
    MessagesDeletePopupComponent,
  ],
  providers: []
})
export class AppRoutingModule {}
