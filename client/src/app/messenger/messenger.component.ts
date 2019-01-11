import { Component, OnInit } from '@angular/core';
import {IMessages} from 'app/shared/model/messages.model';
import {Apollo} from 'apollo-angular';
import {IUser} from 'app/shared/model/user.model';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from 'app/core/index';
import {MessagesService} from '@app/core/services/messages.service';

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
    private messages$: MessagesService,
  ) { }

  ngOnInit() {
    this.authentication.identity().subscribe(res => {
      this.user = res;
    });

    this.$messages = this.messages$.query();

    this.$messages.subscribe((res: any) => {
      const messages: [] = res.edges;
      this.messages = messages;
      this.scrollToBottom();
    });

    this.messagesSubscription = this.messages$.messageConnection()
      .subscribe(({ message }) => {
        const messages = this.messages;
        this.messages = [message, ...messages];
        this.scrollToBottom();
      });
  }

  sendMessage() {
    this.messages$.createMessage(this.message).subscribe(({ text }) => {
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
