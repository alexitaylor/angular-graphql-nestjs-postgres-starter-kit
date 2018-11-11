import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AccessDeniedComponent } from '@app/layouts/access-denied/access-denied.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: AccessDeniedComponent, data: { title: extract('Access Denied') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccessDeniedRoutingModule {}
