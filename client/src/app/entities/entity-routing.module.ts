import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childChildRoutes([
    { path: '', loadChildren: 'app/entities/messages/messages.module#MessagesModule' },
    { path: '', loadChildren: 'app/entities/roles/roles.module#RolesModule' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntityRoutingModule {}
