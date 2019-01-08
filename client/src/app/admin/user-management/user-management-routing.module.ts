import {Injectable, NgModule} from '@angular/core';
import { RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { extract } from 'app/core/index';
import { UserManagementComponent } from '@app/admin/user-management/user-management.component';
import { AuthenticationGuard } from '@app/core';
import {UserManagementUpdateComponent} from '@app/admin/user-management/user-management-update/user-management-update.component';
import {IUser, User} from '@app/shared/model/user.model';
import {UserService} from '@app/core/user/user.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {first} from 'rxjs/internal/operators';
import {
  UserManagementDeletePopupComponent
} from '@app/admin/user-management/user-management-delete-dialog/user-management-delete-dialog.component';
import {UserManagementCreatePopupComponent} from '@app/admin/user-management/user-management-create-dialog/user-management-create-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserMgmtResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      // Close observable after first value is emitted with first operator
      return this.service.findById(id).pipe(map(res => res), first());
    }
    return of(new User());
  }
}

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: UserManagementComponent,
    data: {
      title: extract('User Management'),
      authorities: ['ADMIN']
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: ':id/edit',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserMgmtResolve
    },
    data: {
      title: extract('User Management Edit'),
      authorities: ['ADMIN']
    },
  },
  {
    path: ':id/delete',
    component: UserManagementDeletePopupComponent,
    resolve: {
      user: UserMgmtResolve
    },
    data: {
      title: extract('User Management Delete'),
      authorities: ['ADMIN']
    },
    outlet: 'popup'
  },
  {
    path: 'create',
    component: UserManagementCreatePopupComponent,
    data: {
      title: extract('User Management Create'),
      authorities: ['ADMIN']
    },
    outlet: 'popup'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserManagementRoutingModule {}
