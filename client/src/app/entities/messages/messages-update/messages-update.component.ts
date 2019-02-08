import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessagesService } from '@app/core/services/messages.service';
import { finalize } from 'rxjs/operators';
import { IMessages } from '@app/shared/model/messages.model';

@Component({
  selector: 'app-messages-update',
  templateUrl: './messages-update.component.html',
  styleUrls: ['./messages-update.component.scss']
})
export class MessagesUpdateComponent implements OnInit, OnDestroy {
  message: IMessages;
  messageForm: FormGroup;
  isLoading = false;

  routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messages$: MessagesService,
    private location: Location
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.routeSub = this.route.data.subscribe(({ message }) => {
      this.message = message;
      const messageFormValue = {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        username: message.user.username
      };
      this.messageForm.setValue({
        ...messageFormValue
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public submit() {
    this.isLoading = true;
    const text = this.messageForm.value.text;
    const id = this.message.id;
    this.messages$
      .updateMessage(id, text)
      .pipe(
        finalize(() => {
          this.messageForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.previousState();
      });
  }

  public previousState() {
    this.location.back();
  }

  private createForm() {
    this.messageForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      text: ['', Validators.required],
      createdAt: [{ value: '', disabled: true }],
      updatedAt: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }]
    });
  }
}
