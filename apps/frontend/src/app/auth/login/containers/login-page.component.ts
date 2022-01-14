import { Component } from "@angular/core";
import { LoginPageActions } from "@frontend/state/actions";
import * as fromAuth from "@frontend/state/selectors";
import { Credentials } from "@lbk/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "lbk-login-page",
  template: `
    <main class="lg:h-screen grid place-content-center ">
      <div class="container ">
        <lbk-login-form
          (submitted)="onSubmit($event)"
          [pending]="(pending$ | async)!"
          [errorMessage]="error$ | async"
        >
        </lbk-login-form>
      </div>
    </main>
  `,
  styles: [],
})
export class LoginPageComponent {
  pending$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
    this.pending$ = this.store.select(fromAuth.selectLoginPagePending);
    this.error$ = this.store.select(fromAuth.selectLoginPageError);
  }
}
