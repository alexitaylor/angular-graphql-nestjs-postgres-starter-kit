import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthenticationGuard, extract} from 'app/core/index';
import {RolesComponent} from '@app/entities/roles/roles.component';
import {RolesUpdateComponent} from '@app/entities/roles/roles-update/roles-update.component';
import {RolesService} from '@app/core/services/roles.service';
import {IRole, Role} from '@app/shared/model/role.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {first} from 'rxjs/internal/operators';
import {RolesCreatePopupComponent} from '@app/entities/roles/roles-create-dialog/roles-create-dialog.component';
import {RolesDeletePopupComponent} from '@app/entities/roles/roles-delete-dialog/roles-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RolesResolve implements Resolve<any> {
  constructor(private service: RolesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRole> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      // Close observable after first value is emitted with first operator
      return this.service.findById(id).pipe(map(res => res), first());
    }
    return of(new Role());
  }
}

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'roles',
    children: [
      { path: '',
        component: RolesComponent,
        data: {
          title: extract('Roles'),
          authorities: ['ADMIN']
        } ,
        canActivate: [AuthenticationGuard]
      },
      { path: ':id/edit',
        component: RolesUpdateComponent,
        resolve: {
          role: RolesResolve
        },
        data: {
          title: extract('Roles Update'),
          authorities: ['ADMIN']
        } ,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'create',
        component: RolesCreatePopupComponent,
        data: {
          title: extract('Roles Create'),
          authorities: ['ADMIN']
        },
        outlet: 'popup'
      },
      {
        path: ':id/delete',
        component: RolesDeletePopupComponent,
        resolve: {
          role: RolesResolve
        },
        data: {
          title: extract('Roles Delete'),
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
export class RolesRoutingModule {}
