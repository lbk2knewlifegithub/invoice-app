import { Component } from "@angular/core";
import { SignUpPageActions } from "@frontend/state/actions";
import * as fromSignUpPage from "@frontend/state/selectors/auth/sign-up-page.selector";
import { Credentials } from "@lbk/models";
import { Store } from "@ngrx/store";

@Component({
  selector: "lbk-signup-page",
  template: `
    <main class="lg:h-screen grid place-content-center ">
      <lbk-sign-up-form
        (submitted)="onSubmit($event)"
        [pending]="(pending$ | async)!"
        [errorMessage]="error$ | async"
      >
      </lbk-sign-up-form>
    </main>
  `,
})
export class SignUpPageComponent {
  pending$ = this.store.select(fromSignUpPage.selectSignUpPagePending);
  error$ = this.store.select(fromSignUpPage.selectSignUpPageError);

  constructor(private store: Store) {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(SignUpPageActions.signUp({ credentials }));
  }
}
