import { Component, OnInit } from '@angular/core';
import {IUser} from '@app/shared/model/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@app/core/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '@app/shared';
import {IRole} from '@app/shared/model/role.model';
import {RolesService} from '@app/core/roles/roles.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-management-update',
  templateUrl: './user-management-update.component.html',
  styles: []
})
export class UserManagementUpdateComponent implements OnInit {
  user: IUser;
  userForm: FormGroup;
  isLoading = false;
  roles: IRole[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private user$: UserService,
    private roles$: RolesService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user;
      const userFormData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        roleId: user.role.id,
        __typename: user.__typename,
      };
      this.userForm.setValue({
        ...userFormData
      });
    });

    this.roles$.query().subscribe(res => {
      this.roles = res;
    });
  }

  public submit() {
    this.isLoading = true;
    const user = { id: this.user.id, ...this.userForm.value };
    this.user$.updateUser(user).pipe(
      finalize(() => {
        this.userForm.markAsPristine();
        this.isLoading = false;
      })
    ).subscribe(() => {
      this.previousState();
    });
  }

  public previousState() {
    window.history.back();
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      roleId: ['', Validators.required],
      __typename: ['']
    });
  }

}
