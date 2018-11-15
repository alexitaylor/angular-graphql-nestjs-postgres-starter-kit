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
import { Credentials } from '@app/core/authentication/authentication.service';
import {AuthenticationService} from '@app/core';

const uri = 'http://localhost:8000/graphql';
const credentialsKey = 'credentials';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private auth$: AuthenticationService) {
    const http = httpLink.create({ uri });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
      uri: `ws://localhost:8000/graphql`,
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
      const token = this.auth$.getToken();

      operation.setContext(({ headers = {} }) => {
        if (token) {
          headers['x-token'] = token;
        }

        return {
          headers
        };
      });

      return forward(operation);
    });

    const errorLink = onError(res => {
      if (res.graphQLErrors) {
        res.graphQLErrors.map(({ message, locations, path }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
      }

      if (res.networkError) {
        console.log(`[Network error]: ${res.networkError.message}`);
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
