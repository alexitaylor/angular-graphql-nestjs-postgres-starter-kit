import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '@app/shared/services/event-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Logger } from '@app/core';
import { MessagesService } from '@app/core/services/messages.service';
import { IMessages, Messages } from '@app/shared/model/messages.model';

const log = new Logger('Login');

@Component({
  selector: 'app-messages-create-dialog',
  templateUrl: './messages-create-dialog.html'
})
export class MessagesCreateDialogComponent {
  message: IMessages;
  isLoading = false;
  error: string;
  errorMessage: string;
  messageForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private route: Router,
    private formBuilder: FormBuilder,
    private eventManager: EventManager,
    private messages$: MessagesService
  ) {
    this.createForm();
  }

  clear() {
    this.route.navigate(['/entities/messages'], { replaceUrl: true });
    this.activeModal.dismiss('cancel');
  }

  submit() {
    this.isLoading = true;
    this.messages$
      .createMessage(this.messageForm.value.text)
      .pipe(
        finalize(() => {
          this.messageForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          this.eventManager.broadcast({
            name: 'messagesChange',
            content: res
          });
          this.route.navigate(['/entities/messages'], { replaceUrl: true });
          this.activeModal.dismiss(true);
        },
        (error: any) => {
          log.debug(`Create Message error: ${error}`);
          const errors = {};
          this.error = error;
          this.errorMessage = error.message;
          errors[error.message] = true;
          this.messageForm.controls[error.path].setErrors(errors);
        }
      );
  }

  private createForm() {
    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }
}

@Component({
  selector: 'app-messages-create-popup',
  template: ''
})
export class MessagesCreatePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    setTimeout(() => {
      this.ngbModalRef = this.modalService.open(MessagesCreateDialogComponent as Component, {
        size: 'lg',
        backdrop: 'static'
      });
      this.ngbModalRef.componentInstance.message = new Messages();
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
