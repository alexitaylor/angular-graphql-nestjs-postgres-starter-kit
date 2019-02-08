import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationGuard, extract } from 'app/core/index';
import { MessagesComponent } from '@app/entities/messages/messages.component';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MessagesService } from '@app/core/services/messages.service';
import { IMessages, Messages } from '@app/shared/model/messages.model';
import { MessagesUpdateComponent } from '@app/entities/messages/messages-update/messages-update.component';
import { MessagesCreatePopupComponent } from '@app/entities/messages/messages-create-dialog/messages-create-dialog.component';
import { MessagesDeletePopupComponent } from '@app/entities/messages/messages-delete-dialog/messages-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class MessagesResolve implements Resolve<any> {
  constructor(private service: MessagesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMessages> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      // Close observable after first value is emitted with first operator
      return this.service.findById(id).pipe(
        map(res => res),
        first()
      );
    }
    return of(new Messages());
  }
}

const routes: Routes = [
  {
    path: 'messages',
    children: [
      {
        path: '',
        component: MessagesComponent,
        data: {
          title: extract('Messages Entity'),
          authorities: ['ADMIN']
        },
        canActivate: [AuthenticationGuard]
      },
      {
        path: ':id/edit',
        component: MessagesUpdateComponent,
        resolve: {
          message: MessagesResolve
        },
        data: {
          title: extract('Messages Update'),
          authorities: ['ADMIN']
        },
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'create',
        component: MessagesCreatePopupComponent,
        data: {
          title: extract('Messages Create'),
          authorities: ['ADMIN']
        },
        outlet: 'popup'
      },
      {
        path: ':id/delete',
        component: MessagesDeletePopupComponent,
        resolve: {
          message: MessagesResolve
        },
        data: {
          title: extract('Messages Delete'),
          authorities: ['ADMIN']
        },
        outlet: 'popup'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MessagesRoutingModule {}
