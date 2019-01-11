import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {IMessages} from '@app/shared/model/messages.model';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {handleError} from '@app/core/utils';

declare interface QueryMessages {
  messages: IMessages[];
}

declare interface QueryMessage {
  message: IMessages;
}

declare interface SubscriptionMessage {
  message: IMessages;
}

const queryMessages = gql`
query messages($limit: Int, $cursor: String) {
  messages(cursor: $cursor, limit: $limit) {
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

  query(limit?: number, cursor?: string): Observable<IMessages[]> {
    // Default limit to 20
    limit = limit ? limit : 20;
    cursor = cursor ? cursor : "";
    return this.apollo.watchQuery<QueryMessages>({
      query: queryMessages,
      variables: {
        limit,
        cursor
      }
    }).valueChanges.pipe(
      map(res => res.data.messages),
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

  messageConnection(): Observable<SubscriptionMessage> {
    return this.apollo
      .subscribe({
        query: messageSubscription
      }).pipe(map((res) => res.data.messageCreated));
  }

  createMessage(text: string): Observable<IMessages> {
    return this.apollo.mutate({
      mutation: createMessage,
      variables: {
        text
      }
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
      }
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
    }).pipe(
      map(({ data }) => data.deleteMessage),
      catchError(handleError)
    )
  }
}
