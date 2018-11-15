import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { IUser } from '@app/shared/model/user.model';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface SignUpContext {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

const signIn = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const signUp = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      token
    }
  }
`;

declare interface Me {
  me: IUser;
}

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  private _userIdentity: IUser;
  private authenticated = false;

  constructor(private apollo: Apollo) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  authenticate(identity: IUser) {
    this._userIdentity = identity;
    this.authenticated = identity !== null;
  }

  /**
   * Get current logged in user
   * @return The the logged in user's data.
   */
  identity(): Observable<IUser> {
    return this.apollo
      .watchQuery<Me>({
        query: gql`
          query me {
            me {
              id
              role
              firstName
              lastName
              username
            }
          }
        `
      })
      .valueChanges.pipe(map(res => res.data.me));
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials | any> {
    const user = {
      username: context.username,
      token: '',
      remember: context.remember
    };

    return this.apollo
      .mutate({
        mutation: signIn,
        variables: {
          login: context.username,
          password: context.password
        }
      })
      .pipe(
        map(({ data }) => {
          user.token = data.signIn.token;
          this.setCredentials(user, context.remember);
          return user;
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
      );
  }

  /**
   * Create and authenticate the user.
   * @param context The signUp parameters.
   * @return The user credentials.
   */
  signUp(context: SignUpContext): Observable<Credentials | any> {
    const user = {
      username: context.username,
      token: '',
      remember: context.remember
    };

    return this.apollo
      .mutate({
        mutation: signUp,
        variables: {
          firstName: context.firstName,
          lastName: context.lastName,
          email: context.email,
          username: context.username,
          password: context.password
        }
      })
      .pipe(
        map(({ data }) => {
          user.token = data.signUp.token;
          this.setCredentials(user, context.remember);
          return user;
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
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    this.authenticate(null);
    // reset the store: This will cause the store to be cleared and all active queries to be refetched.
    this.apollo.getClient().resetStore();
    return of(true);
  }

  /**
   * Retrieves token from local storage or session storage
   * @return Token
   */
  getToken(): string {
    // get the authentication token from local storage if it exists
    const lsCredentials: Credentials | null = JSON.parse(localStorage.getItem(credentialsKey));
    const ssCredentials: Credentials | null = JSON.parse(sessionStorage.getItem(credentialsKey));
    let token: string;

    if (!!lsCredentials) {
      token = lsCredentials.token;
    } else if (!!ssCredentials) {
      token = ssCredentials.token;
    }

    return token;
  }

  /**
   * Checks if user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Checks if user has authority
   * @return True if the user is authorized.
   */
  hasAnyAuthority(authorities: string[], role: string): boolean {
    return this.hasAnyAuthorityDirect(authorities, role);
  }

  /**
   * Checks if user has authority and is authenticated.
   * @return True if the user is authenticated and authorized.
   */
  hasAnyAuthorityDirect(authorities: string[], role: string): boolean {
    // TODO if (!this.isAuthenticated() || !this._userIdentity) {
    if (!this.isAuthenticated()) {
      return false;
    }

    if (authorities.includes(role)) {
      return true;
    }

    return false;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }

    this.identity().pipe(
      map(res => {
        this._userIdentity = res;
      })
    );
  }
}
