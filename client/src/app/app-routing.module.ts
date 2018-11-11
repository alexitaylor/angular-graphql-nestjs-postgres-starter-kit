import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AccessDeniedModule } from '@app/layouts/access-denied/access-denied.module';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'user-management', loadChildren: 'app/admin/user-management/user-management.module#UserManagementModule' },
    { path: 'access-denied', loadChildren: 'app/layouts/access-denied/access-denied.module#AccessDeniedModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
