import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { Credentials } from '@app/core/authentication/authentication.service';

const uri = 'http://localhost:8000/graphql';
const credentialsKey = 'credentials';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const http = httpLink.create({ uri });
    // get the authentication token from local storage if it exists
    const lsCredentials: Credentials | null = JSON.parse(localStorage.getItem(credentialsKey));
    const ssCredentials: Credentials | null = JSON.parse(sessionStorage.getItem(credentialsKey));
    let token: string;

    if (!!lsCredentials) {
      token = lsCredentials.token;
    } else if (!!ssCredentials) {
      token = ssCredentials.token;
    }

    const auth = setContext((request, previousContext) => ({
      authorization: token
    }));

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `ws://localhost:8000/graphql`,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: token
        }
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      auth.concat(http)
    );

    // Create Apollo client
    this.apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
