import {Injectable} from '@angular/core';
import {IUser} from '../../shared/model/user.model';
import {Observable} from 'rxjs/index';
import gql from 'graphql-tag';
import {catchError, map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {handleError} from '../utils';

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
  roleName: string;
}

const queryUsers = gql`
  query users {
    users {
      id
      firstName
      lastName
      username
      email
      role {
      id
        name
      }
    }
  }
`;

const queryUser = gql`
  query user($id: ID!) {
    user (id: $id) {
      id
      firstName
      lastName
      username
      email
      role {
        id
        name
      }
    }
  }
`;

const createUser = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $roleName: String!) {
    createUser(createUserInput: { firstName: $firstName, lastName: $lastName, email: $email, username: $username, roleName: $roleName }) {
      firstName
      lastName
      username
      email
    }
  } 
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $username: String!, $roleName: String!) {
    updateUser(updateUserInput: { id: $id, firstName: $firstName, lastName: $lastName, email: $email, username: $username, roleName: $roleName }) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
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
      query: queryUser,
      variables: {
        id,
      }
    }).valueChanges.pipe(map(res => res.data.user));
  }

  createUser(user: ICreateUserContext): Observable<IUser> {
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        ...user,
        roleName: user.roleName
      },
      // refetchQueries: Updates the cache in order to refetch parts of the store
      // that may have been affected by the mutation
      refetchQueries: [{
        query: queryUsers
      }]
    }).pipe(
      map(({ data }: any) => data.createUser),
      catchError(handleError)
    )
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.apollo.mutate({
      mutation: updateUser,
      variables: {
       ...user,
        roleName: user.roleName
      },
      refetchQueries: [{
        query: queryUsers
      }]
    }).pipe(
      map(({ data }: any) => data.updateUser),
      catchError(handleError)
    )
  }

  deleteUser(id: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        id
      },
      refetchQueries: [{
        query: queryUsers
      }]
    }).pipe(
      map(({ data }: any) => data.deleteUser),
      catchError(handleError)
    )
  }
}
