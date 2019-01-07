import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import {
  UserManagementDeleteDialogComponent,
  UserManagementDeletePopupComponent
} from '@app/admin/user-management/user-management-delete-dialog/user-management-delete-dialog.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'user-management', loadChildren: 'app/admin/user-management/user-management.module#UserManagementModule' },
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
  entryComponents: [UserManagementDeleteDialogComponent, UserManagementDeletePopupComponent],
  providers: []
})
export class AppRoutingModule {}
