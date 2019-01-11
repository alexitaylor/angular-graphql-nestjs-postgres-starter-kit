import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRole} from '@app/shared/model/role.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {RolesService} from '@app/core/services/roles.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-roles-update',
  templateUrl: './roles-update.component.html',
  styleUrls: ['./roles-update.component.scss']
})
export class RolesUpdateComponent implements OnInit, OnDestroy {
  role: IRole;
  roleForm: FormGroup;
  isLoading = false;

  routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private roles$: RolesService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.routeSub = this.route.data.subscribe(({role}) => {
      this.role = role;
      this.roleForm.setValue({
        ...this.role,
      })
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public submit() {
    this.isLoading = true;
    const role = { id: this.role.id, ...this.roleForm.value };
    this.roles$.updateRole(role).pipe(
      finalize(() => {
        this.roleForm.markAsPristine();
        this.isLoading = false;
      })
    ).subscribe(() => {
      this.previousState();
    })
  }

  public previousState() {
    window.history.back();
  }

  private createForm() {
    this.roleForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      __typename: ['']
    });
  }

}
