import {Component, OnDestroy, OnInit} from '@angular/core';
import { IUser } from '@app/shared/model/user.model';
import {UserService} from '@app/core/user/user.service';
import {EventManager} from '@app/shared/services/event-manager.service';
import {Subscription} from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: IUser[];
  eventSub: Subscription;
  userSub: Subscription;

  constructor(
    private user$: UserService,
    private eventManager: EventManager,
  ) {}

  ngOnInit() {
    this.reset();
    this.listenToUserManagementChange();
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSub);
    this.userSub.unsubscribe();
  }

  reset() {
    this.userSub = this.user$.query().subscribe(res => {
      this.users = res;
      this.initDataTable();
    });
  }

  private initDataTable() {
    $(document).ready(function() {
      $('#user-management').DataTable();
    });
  }

  listenToUserManagementChange() {
    this.eventSub = this.eventManager.subscribe('userManagementChange', () => {
      setTimeout(() => {
        this.reset();
      }, 300);
    });
  }
}
