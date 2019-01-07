import { Component, OnInit } from '@angular/core';
import {IMessages} from 'app/shared/model/messages.model';
import {Apollo} from 'apollo-angular';
import {IUser} from 'app/shared/model/user.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {AuthenticationService} from 'app/core/index';

declare interface Query {
  messages: IMessages[];
}

const createMessage = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
      text
      user {
        id
       }
    }
  }
`;

const MESSAGE_CREATED = gql`
  subscription messageCreated {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  $messages: Observable<IMessages[]>;
  messages: IMessages[] = [];
  message: string;
  messagesSubscription: Subscription;
  user: IUser;

  constructor(
    private  apollo: Apollo,
    private authentication: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authentication.identity().subscribe(res => {
      this.user = res;
    });

    this.$messages = this.apollo
      .watchQuery<Query>({
        query: gql`
          query messages {
            messages(limit: 20) {
              edges {
                text
                user {
                  id,
                  username
                }
              }
              pageInfo {
                endCursor,
                hasNextPage
              }
            }
          }
        `
      }).valueChanges.pipe(map(res => res.data.messages));

    this.$messages.subscribe((res: any) => {
      const messages: [] = res.edges;
      this.messages = messages;
      this.scrollToBottom();
    });

    this.messagesSubscription = this.apollo
      .subscribe({
        query: MESSAGE_CREATED
      })
      .subscribe(({ data }) => {
        const messages = this.messages;
        this.messages = [data.messageCreated.message, ...messages];
        this.scrollToBottom();
      });
  }

  sendMessage() {
    this.apollo.mutate({
      mutation: createMessage,
      variables: {
        text: this.message
      }
    }).subscribe(({ data }) => {
      this.message = '';
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      let $messages = document.getElementById("messages");
      if ($messages) {
        $messages.scrollTop = $messages.scrollHeight;
      }
    }, 150);
  }

}
