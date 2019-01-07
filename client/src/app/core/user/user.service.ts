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

export interface ICreateUserContext {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
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

const createUser = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $roleId: ID!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, roleId: $roleId) {
      firstName
      lastName
      username
      email
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

  createUser(user: ICreateUserContext): Observable<IUser> {
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        ...user
      },
      refetchQueries: [{
        query: queryUsers
      }]
    }).pipe(
      map(({ data }) => data.createUser),
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

  deleteUser(id: number): Observable<boolean> {
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
      map(({ data }) => data.deleteUser),
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
