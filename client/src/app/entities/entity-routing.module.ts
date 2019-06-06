import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childChildRoutes([
    { path: '', loadChildren: () => import('app/entities/messages/messages.module').then(m => m.MessagesModule) },
    { path: '', loadChildren: () => import('app/entities/roles/roles.module').then(m => m.RolesModule) }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntityRoutingModule {}
