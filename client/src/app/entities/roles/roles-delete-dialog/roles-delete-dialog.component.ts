import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {EventManager} from '@app/shared/services/event-manager.service';
import {IRole} from '@app/shared/model/role.model';
import {RolesService} from '@app/core/roles/roles.service';

@Component({
  selector: 'app-roles-delete-dialog',
  templateUrl: './roles-delete-dialog.html'
})
export class RolesDeleteDialogComponent {
  role: IRole;

  constructor(
    private roles$: RolesService,
    public activeModal: NgbActiveModal,
    private route: Router,
    private eventManager: EventManager,
  ) {}

  clear() {
    this.route.navigate(['/entities/roles'], {replaceUrl: true});
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.roles$.deleteRole(id).subscribe(res => {
      this.eventManager.broadcast({
        name: 'rolesChange',
        content: 'Deleted role'
      });
      this.route.navigate(['/entities/roles'], {replaceUrl: true});
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-roles-delete-popup',
  template: ''
})
export class RolesDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ role }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RolesDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.role = role;
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
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
