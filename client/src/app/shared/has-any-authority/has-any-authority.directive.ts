import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@app/core';

/**
 * @whatItDoes Conditionally includes an HTML element if current users has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
  selector: '[appHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
  private authorities: string[];

  constructor(
    private authentication$: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set appHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.authentication$
      .getAuthenticatedState()
      .toPromise()
      .then(identity => this.updateView());
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    this.authentication$.identity().subscribe(res => {
      const role = res ? res.role.name : null;
      if (this.authentication$.hasAnyAuthority(this.authorities, role)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
