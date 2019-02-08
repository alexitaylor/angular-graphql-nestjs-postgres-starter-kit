import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { AuthenticationService } from '@app/core';

const uri = 'http://localhost:4000/graphql';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private auth$: AuthenticationService) {
    const http = httpLink.create({ uri });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
      uri: `ws://localhost:4000/graphql`,
      options: {
        reconnect: true
      }
    });

    const terminatingLink = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return def.kind === 'OperationDefinition' && def.operation === 'subscription';
      },
      wsLink,
      http
    );

    const authLink = new ApolloLink((operation, forward) => {
      const vm = this;
      operation.setContext(({ headers = {}, localToken = vm.auth$.getToken() }) => {
        if (localToken) {
          // headers['x-token'] = localToken;
          headers['authorization'] = `Bearer ${localToken}`;
        }

        return {
          headers
        };
      });

      return forward(operation);
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(`GRAPHQL ERROR: ${message}`);
          if (message === 'NOT_AUTHENTICATED') {
            this.auth$.logout();
            this.auth$.redirectLogoutOnSessionExpired();
          } else if (message === 'Token error: invalid signature') {
            this.auth$.logout();
            this.auth$.redirectLogoutOnSessionExpired();
          }
        });
      }

      if (networkError) {
        if (networkError['statusCode'] === 401) {
          this.auth$.logout();
          this.auth$.redirectLogoutOnSessionExpired();
        }

        networkError['error'].errors.forEach((err: any) => {
          if (err.message === 'Context creation failed: Your session expired. Sign in again.') {
            this.auth$.logout();
            this.auth$.redirectLogoutOnSessionExpired();
          }
        });
      }
    });

    const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

    const cache = new InMemoryCache();

    // Create Apollo client
    this.apollo.create({
      link,
      cache
    });
  }
}
