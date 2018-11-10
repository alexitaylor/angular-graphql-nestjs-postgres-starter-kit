import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { Logger, I18nService, AuthenticationService } from 'app/core/index';
import { ValidationService } from '@app/shared';

const log = new Logger('Login');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  version: string = environment.version;
  error: string;
  errorMessage: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  signUp() {
    this.isLoading = true;
    this.authenticationService
      .signUp(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`${credentials.username} successfully signed up`);
          this.route.queryParams.subscribe(params =>
            this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          );
        },
        error => {
          log.debug(`Login error: ${error}`);
          const errors = {};
          this.error = error;
          this.errorMessage = error.message;
          errors[error.message] = true;
          this.loginForm.controls[error.path].setErrors(errors);
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      remember: true
    });
  }
}
