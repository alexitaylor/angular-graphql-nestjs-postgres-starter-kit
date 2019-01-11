import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {EventManager} from '@app/shared/services/event-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {Logger} from '@app/core';
import {RolesService} from '@app/core/services/roles.service';
import {IRole, Role} from '@app/shared/model/role.model';

const log = new Logger('Login');

@Component({
  selector: 'app-roles-create-dialog',
  templateUrl: './roles-create-dialog.html'
})
export class RolesCreateDialogComponent {
  role: IRole;
  isLoading = false;
  error: string;
  errorMessage: string;
  roleForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private route: Router,
    private formBuilder: FormBuilder,
    private eventManager: EventManager,
    private roles$: RolesService
  ) {
    this.createForm();
  }

  clear() {
    this.route.navigate(['/entities/roles'], {replaceUrl: true});
    this.activeModal.dismiss('cancel');
  }

  submit() {
    this.isLoading = true;
    this.roles$.createRole(this.roleForm.value).pipe(
      finalize(() => {
        this.roleForm.markAsPristine();
        this.isLoading = false;
      })
    ).subscribe((res: any) => {
        this.eventManager.broadcast({
          name: 'rolesChange',
          content: 'Create role'
        });
        this.route.navigate(['/entities/roles'], {replaceUrl: true});
        this.activeModal.dismiss(true);
    },
      (error: any) => {
        log.debug(`Create Role error: ${error}`);
        const errors = {};
        this.error = error;
        this.errorMessage = error.message;
        errors[error.message] = true;
        this.roleForm.controls[error.path].setErrors(errors);
      }
    )
  }

  private createForm() {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
}

@Component({
  selector: 'app-roles-create-popup',
  template: ''
})
export class RolesCreatePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    setTimeout(() => {
      this.ngbModalRef = this.modalService.open(RolesCreateDialogComponent as Component, {
        size: 'lg',
        backdrop: 'static'
      });
      this.ngbModalRef.componentInstance.role = new Role();
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
