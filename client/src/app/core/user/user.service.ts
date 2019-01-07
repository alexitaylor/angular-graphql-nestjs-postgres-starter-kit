import {Injectable} from '@angular/core';
import {IUser} from '@app/shared/model/user.model';
import {Observable, throwError} from 'rxjs/index';
import gql from 'graphql-tag';
import {catchError, map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

declare interface QueryUsers {
  users: IUser[];
}

declare interface QueryUser {
  user: IUser;
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const queryUsers = gql`
  query users {
    users {
      id
      firstName
      lastName
      username
      email
      role {
        name
      }
    }
  }
`;

@Injectable({ providedIn: 'root'})
export class UserService {

  constructor(private apollo: Apollo) {}

  query(): Observable<IUser[]> {
    return this.apollo.watchQuery<QueryUsers>({
        query: queryUsers
      }).valueChanges.pipe(map(res => res.data.users));
  }

  findById(id: number): Observable<IUser> {
    return this.apollo.watchQuery<QueryUser>({
      query: gql`
        query user($id: ID!) {
          user (id: $id) {
            id
            firstName
            lastName
            username
            email
            role {
              name
            }
          }
        }
      `,
      variables: {
        id,
      }
    }).valueChanges.pipe(map(res => res.data.user));
  }

  deleteUser(id: number): Observable<boolean> {
    console.log(': ', );
    return this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        id: id
      },
      // refetchQueries: Updates the cache in order to refetch parts of the store
      // that may have been affected by the mutation
      refetchQueries: [{
        query: queryUsers
      }]
    }).pipe(
      map(({ data }) => {
        return data.deleteUser;
      }),
      catchError(err => {
        if (err.graphQLErrors) {
          let error = null;

          err.graphQLErrors.forEach((e: any) => {
            error = {
              message: e.extensions.exception.errors[0].message,
              path: e.extensions.exception.errors[0].path,
              type: e.extensions.exception.errors[0].type,
              value: e.extensions.exception.errors[0].value
            };
          });

          return throwError(error);
        }
        if (err.networkError) {
          return throwError(err);
        }
      })
    )
  }
}
