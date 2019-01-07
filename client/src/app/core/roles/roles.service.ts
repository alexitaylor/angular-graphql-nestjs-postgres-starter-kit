import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {IRole} from '@app/shared/model/role.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';

declare interface QueryRoles {
  roles: IRole[];
}

@Injectable({ providedIn: 'root' })
export class RolesService {

  constructor(private apollo: Apollo) {}

  query(): Observable<IRole[]> {
    return this.apollo.watchQuery<QueryRoles>({
      query: gql`
      query roles {
        roles {
          id
          name
        }
      }
    `
    }).valueChanges.pipe(map(res => res.data.roles));
  }
}
