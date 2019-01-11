import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {IRole} from '../../shared/model/role.model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {handleError} from '../utils';

declare interface QueryRoles {
  roles: IRole[];
}

declare interface QueryRole {
  role: IRole;
}

const queryRoles = gql`
  query roles {
    roles {
      id
      name
    }
  }
`;

const queryRole = gql`
  query role($id: ID!) {
    role(id: $id) {
      id
      name
    }
  }
`;

const createRole = gql`
  mutation createRole($name: String!) {
    createRole(name: $name) {
      id
      name
    }
  }
`;

const updateRole = gql`
  mutation updateRole($id: ID!, $name: String!) {
    updateRole(id: $id, name: $name) {
      id
      name
    }
  }
`;

const deleteRole = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;

@Injectable({ providedIn: 'root' })
export class RolesService {

  constructor(private apollo: Apollo) {}

  query(): Observable<IRole[]> {
    return this.apollo.watchQuery<QueryRoles>({
      query: queryRoles,
    }).valueChanges.pipe(map(res => res.data.roles));
  }

  findById(id: number): Observable<IRole> {
    return this.apollo.watchQuery<QueryRole>({
      query: queryRole,
      variables: {
        id
      }
    }).valueChanges.pipe(map(res => res.data.role));
  }

  createRole(role: IRole): Observable<IRole> {
    return this.apollo.mutate({
      mutation: createRole,
      variables: {
        ...role
      },
      // refetchQueries: Updates the cache in order to refetch parts of the store
      // that may have been affected by the mutation
      refetchQueries: [{
        query: queryRoles,
      }]
    }).pipe(
      map(({ data }: any) => data.createRole),
      catchError(handleError)
    )
  }

  updateRole(role: IRole): Observable<IRole> {
    return this.apollo.mutate({
      mutation: updateRole,
      variables: {
        ...role
      },
      refetchQueries: [{
        query: queryRoles,
      }]
    }).pipe(
      map(({ data }: any) => data.updateRole),
      catchError(handleError)
    )
  }

  deleteRole(id: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: deleteRole,
      variables: {
        id
      },
      refetchQueries: [{
        query: queryRoles,
      }]
    }).pipe(
      map(({ data }: any) => data.deleteUser),
      catchError(handleError)
    )
  }
}
