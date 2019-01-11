import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from '@app/core/services/messages.service';
import {EventManager} from '@app/shared/services/event-manager.service';
import {Subscription} from 'rxjs';
import {IMessages} from '@app/shared/model/messages.model';

declare const $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: IMessages[];
  messagesSub: Subscription;
  eventSub: Subscription;

  constructor(
    private messages$: MessagesService,
    private eventManager: EventManager,
  ) { }

  ngOnInit() {
    this.reset();
    this.listenToUserManagementChange();
  }

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe();
    this.eventManager.destroy(this.eventSub);
  }

  reset() {
    this.messagesSub = this.messages$.query().subscribe((res: any) => {
      const messages: [] = res.edges.sort((a: IMessages, b: IMessages) => {
        return a.id - b.id;
      });
      this.messages = messages;
      this.initDataTable();
    })
  }

  private initDataTable() {
    $(document).ready(() => {
      $('#messages-table').DataTable();
    })
  }

  listenToUserManagementChange() {
    this.eventSub = this.eventManager.subscribe('messagesChange', () => {
      setTimeout(() => {
        this.reset();
      }, 300);
    });
  }
}
