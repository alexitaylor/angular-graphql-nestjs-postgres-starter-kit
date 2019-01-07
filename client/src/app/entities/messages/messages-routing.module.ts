import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard, extract} from 'app/core/index';
import {MessagesComponent} from '@app/entities/messages/messages.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '',
    component: MessagesComponent,
    data: {
      title: extract('Messenger'),
      authorities: ['ADMIN', 'USER']
    } ,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MessagesRoutingModule {}
