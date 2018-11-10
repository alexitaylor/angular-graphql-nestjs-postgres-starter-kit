import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/shared/model/user.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare const $: any;

declare interface Query {
  users: IUser[];
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  $users: Observable<IUser[]>;
  users: IUser[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.$users = this.apollo
      .watchQuery<Query>({
        query: gql`
          query users {
            users {
              id
              firstName
              lastName
              username
              email
              role
            }
          }
        `
      })
      .valueChanges.pipe(map(res => res.data.users));

    this.$users.subscribe(res => {
      this.users = res;
      this.initDataTable();
    });
  }

  private initDataTable() {
    $(document).ready(function() {
      $('#user-management').DataTable();
    });
  }
}
