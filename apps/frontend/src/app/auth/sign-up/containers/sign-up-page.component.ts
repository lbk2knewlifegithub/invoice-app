import { Component } from "@angular/core";
import { SignUpPageActions } from "../actions";
import { Credentials } from "@lbk/models";
import { Store } from "@ngrx/store";
import * as fromSignUpPage from "../sign-up-page.reducer";

@Component({
  selector: "lbk-signup-page",
  template: `
    <main class="mt-32 lg:h-screen grid place-content-center ">
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
