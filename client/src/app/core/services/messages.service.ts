import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {IMessages, Messages} from '@app/shared/model/messages.model';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {handleError} from '@app/core/utils';

export interface IQueryMessages {
  edges: IMessages[];
  pageInfo: PageInfo
}

declare interface PageInfo {
  endCursor: string,
  hasNextPage: boolean
}

declare interface MessagesDataQuery {
  messages: IQueryMessages
}

declare interface QueryMessage {
  message: IMessages;
}

declare interface SubscriptionMessage {
  message: IMessages;
}

/**
 * The @connection directive
 *
 * When using paginated queries, results from accumulated queries can be
 * hard to find in the store, as the parameters passed to the query are used
 * to determine the default store key but are usually not known outside the
 * piece of code that executes the query.
 *
 * To direct Apollo Client to use a stable store key for paginated queries,
 * you can use the optional @connection directive to specify a store key for
 * parts of your queries.
 * */
const queryMessages = gql`
query messages($limit: Int, $cursor: String) {
  messages(cursor: $cursor, limit: $limit) @connection(key: "messages", filter: ["type"]) {
    edges {
      id
      text
      createdAt
      updatedAt
      user {
        id
        username
      }
    }
    pageInfo {
      endCursor,
      hasNextPage
    }
  }
}
`;

const queryMessage = gql`
query message($id: ID!) {
  message(id: $id) {
    id
    text
    createdAt
    updatedAt
    user {
      id
      username
    }
  }
}
`;

const createMessage = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
      id
      text
      user {
        id
        username
       }
    }
  }
`;

const updateMessage = gql`
  mutation updateMessage($id: ID!, $text: String!) {
    updateMessage(id: $id, text: $text) {
      id
      text
      createdAt
      updatedAt
      user {
        id
        username
       }
    }
  }
`;

const messageSubscription = gql`
  subscription messageCreated {
    messageCreated {
      message {
        id
        text
        createdAt
        updatedAt
        user {
          id
          username
        }
      }
    }
  }
`;

const deleteMessage = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private apollo: Apollo) { }

  query(limit?: number, cursor?: string): Observable<IQueryMessages> {
    // Default limit to 20
    limit = limit ? limit : 20;
    cursor = cursor ? cursor : "";
    return this.apollo.watchQuery<MessagesDataQuery>({
      query: queryMessages,
      variables: {
        limit,
        cursor
      }
    }).valueChanges.pipe(
      map(({ data }) => data.messages),
      catchError(handleError)
    );
  }

  findById(id: number): Observable<IMessages> {
    return this.apollo.watchQuery<QueryMessage>({
      query: queryMessage,
      variables: {
        id
      }
    }).valueChanges.pipe(
      map(res => res.data.message),
      catchError(handleError)
    );
  }

  messageConnection(): Observable<IMessages> {
    return this.apollo
      .subscribe({
        query: messageSubscription
      }).pipe(map((res) => res.data.messageCreated.message));
  }

  createMessage(text: string): Observable<IMessages> {
    return this.apollo.mutate({
      mutation: createMessage,
      variables: {
        text
      },
      // refetchQueries: Updates the cache in order to refetch parts of the store
      // that may have been affected by the mutation
      refetchQueries: [{
        query: queryMessages,
      }]
    }).pipe(
      map(res => res.data.createMessage),
      catchError(handleError)
    );
  }

  updateMessage(id: number, text: string): Observable<IMessages> {
    return this.apollo.mutate({
      mutation: updateMessage,
      variables: {
        id,
        text
      },
      refetchQueries: [{
        query: queryMessages,
      }]
    }).pipe(
      map(({ data }) => data.updateMessage),
      catchError(handleError)
    )
  }

  deleteMessage(id: number): Observable<boolean> {
    return this.apollo.mutate({
      mutation: deleteMessage,
      variables: {
        id
      },
      refetchQueries: [{
        query: queryMessages,
      }]
    }).pipe(
      map(({ data }) => data.deleteMessage),
      catchError(handleError)
    )
  }

  private convertDataFromServer(message: IMessages): IMessages {
    if (!!message) {
      message.createdAt = message.createdAt ? `${new Date(parseInt(`${message.createdAt}`))}` : null;
      message.updatedAt = message.updatedAt ? `${new Date(parseInt(`${message.updatedAt}`))}` : null;
    }

    return message;
  }

  private convertDataArrayFromServer(data: IMessages[]): IMessages[] {
    if (!!data && Array.isArray(data)) {
      data.forEach((message: IMessages) => {
        message.createdAt = message.createdAt ? `${new Date(parseInt(`${message.createdAt}`))}` : null;
        message.updatedAt = message.updatedAt ? `${new Date(parseInt(`${message.updatedAt}`))}` : null;
      });
    }

    return data;
  }
}
