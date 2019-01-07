import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {IUser} from '@app/shared/model/user.model';
import {UserService} from '@app/core/user/user.service';
import {EventManager} from '@app/shared/services/event-manager.service';

@Component({
  selector: 'app-user-management-delete-dialog',
  templateUrl: './user-management-delete-dialog.html'
})
export class UserManagementDeleteDialogComponent {
  user: IUser;

  constructor(
    private user$: UserService,
    public activeModal: NgbActiveModal,
    private route: Router,
    private eventManager: EventManager,
  ) {}

  clear() {
    this.route.navigate(['/user-management'], {replaceUrl: true});
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.user$.deleteUser(id).subscribe(res => {
      this.eventManager.broadcast({
        name: 'userManagementChange',
        content: 'Deleted user'
      });
      this.route.navigate(['/user-management'], {replaceUrl: true});
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-user-management-delete-popup',
  template: ''
})
export class UserManagementDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserManagementDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.user = user;
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
