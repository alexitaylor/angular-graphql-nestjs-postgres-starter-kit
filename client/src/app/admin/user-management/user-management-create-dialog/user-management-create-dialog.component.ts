import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IUser, User } from '@app/shared/model/user.model';
import { UserService } from '@app/core/services/user.service';
import { EventManager } from '@app/shared/services/event-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared';
import { finalize } from 'rxjs/operators';
import { Logger } from '@app/core';
import { RolesService } from '@app/core/services/roles.service';
import { IRole } from '@app/shared/model/role.model';

const log = new Logger('Login');

@Component({
  selector: 'app-user-management-create-dialog',
  templateUrl: './user-management-create-dialog.html'
})
export class UserManagementCreateDialogComponent {
  user: IUser;
  isLoading = false;
  error: string;
  errorMessage: string;
  createUserForm: FormGroup;
  roles: IRole[];

  constructor(
    private user$: UserService,
    public activeModal: NgbActiveModal,
    private route: Router,
    private formBuilder: FormBuilder,
    private eventManager: EventManager,
    private roles$: RolesService
  ) {
    this.createForm();
    this.roles$.query().subscribe(res => {
      this.roles = res;
    });
  }

  clear() {
    this.route.navigate(['/user-management'], { replaceUrl: true });
    this.activeModal.dismiss('cancel');
  }

  submit() {
    this.isLoading = true;
    this.user$
      .createUser(this.createUserForm.value)
      .pipe(
        finalize(() => {
          this.createUserForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          this.eventManager.broadcast({
            name: 'userManagementChange',
            content: 'Create user'
          });
          this.route.navigate(['/user-management'], { replaceUrl: true });
          this.activeModal.dismiss(true);
        },
        (error: any) => {
          log.debug(`Create User error: ${error}`);
          const errors = {};
          this.error = error;
          this.errorMessage = error.message;
          errors[error.message] = true;
          this.createUserForm.controls[error.path].setErrors(errors);
        }
      );
  }

  private createForm() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      roleName: ['USER']
    });
  }
}

@Component({
  selector: 'app-user-management-create-popup',
  template: ''
})
export class UserManagementCreatePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    setTimeout(() => {
      this.ngbModalRef = this.modalService.open(UserManagementCreateDialogComponent as Component, {
        size: 'lg',
        backdrop: 'static'
      });
      this.ngbModalRef.componentInstance.user = new User();
      this.ngbModalRef.result.then(
        result => {
          this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
          this.ngbModalRef = null;
        },
        reason => {
          this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
          this.ngbModalRef = null;
        }
      );
    }, 0);
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
