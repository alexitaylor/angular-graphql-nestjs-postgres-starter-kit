import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from 'app/core/index';
import { UserManagementComponent } from '@app/admin/user-management/user-management.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: UserManagementComponent,
    data: {
      title: extract('User Management')
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserManagementRoutingModule {}
