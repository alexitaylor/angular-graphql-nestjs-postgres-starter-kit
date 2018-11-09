import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '@app/shared';

@Component({
  selector: 'app-control-messages',
  template: `<span *ngIf="errorMessage !== null" class="text-danger" translate>{{errorMessage}}</span>`,
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
