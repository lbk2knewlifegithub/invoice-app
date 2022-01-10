import { Component } from "@angular/core";
import { LoginPageActions } from "@frontend/state/actions";
import * as fromAuth from "@frontend/state/selectors";
import { Credentials } from "@lbk/models";
import { Store } from "@ngrx/store";

@Component({
  selector: "bc-login-page",
  template: `
    <lbk-login-form
      (submitted)="onSubmit($event)"
      [pending]="(pending$ | async)!"
      [errorMessage]="error$ | async"
    >
    </lbk-login-form>
  `,
  styles: [],
})
export class LoginPageComponent {
  pending$ = this.store.select(fromAuth.selectLoginPagePending);
  error$ = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store) {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
