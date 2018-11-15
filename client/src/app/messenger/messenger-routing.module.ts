import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard, extract} from '@app/core';
import {MessengerComponent} from '@app/messenger/messenger.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '',
    component: MessengerComponent,
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
export class MessengerRoutingModule {}
