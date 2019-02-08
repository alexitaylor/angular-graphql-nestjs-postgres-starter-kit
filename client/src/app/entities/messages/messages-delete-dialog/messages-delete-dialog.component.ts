import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '@app/shared/services/event-manager.service';
import { MessagesService } from '@app/core/services/messages.service';
import { IMessages } from '@app/shared/model/messages.model';

@Component({
  selector: 'app-messages-delete-dialog',
  templateUrl: './messages-delete-dialog.html'
})
export class MessagesDeleteDialogComponent {
  message: IMessages;

  constructor(
    private messages$: MessagesService,
    public activeModal: NgbActiveModal,
    private route: Router,
    private eventManager: EventManager
  ) {}

  clear() {
    this.route.navigate(['/entities/messages'], { replaceUrl: true });
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.messages$.deleteMessage(id).subscribe(res => {
      this.eventManager.broadcast({
        name: 'messagesChange',
        content: 'Deleted message'
      });
      this.route.navigate(['/entities/messages'], { replaceUrl: true });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-messages-delete-popup',
  template: ''
})
export class MessagesDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ message }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MessagesDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.message = message;
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
