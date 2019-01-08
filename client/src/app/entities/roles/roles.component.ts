import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRole} from '@app/shared/model/role.model';
import {RolesService} from '@app/core/roles/roles.service';
import {Subscription} from 'rxjs';
import {EventManager} from '@app/shared/services/event-manager.service';

declare const $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  roles: IRole[];
  rolesSub: Subscription;
  eventSub: Subscription;

  constructor(
    private roles$: RolesService,
    private eventManager: EventManager,
  ) { }

  ngOnInit() {
    this.reset();
    this.listenToUserManagementChange();
  }

  ngOnDestroy(): void {
    this.rolesSub.unsubscribe();
    this.eventManager.destroy(this.eventSub);
  }

  reset() {
    this.rolesSub = this.roles$.query().subscribe(res => {
      this.roles = res;
      this.initDataTable();
    })
  }

  private initDataTable() {
    $(document).ready(() => {
      $('#roles-table').DataTable();
    })
  }

  listenToUserManagementChange() {
    this.eventSub = this.eventManager.subscribe('rolesChange', () => {
      setTimeout(() => {
        this.reset();
      }, 300);
    });
  }

}
