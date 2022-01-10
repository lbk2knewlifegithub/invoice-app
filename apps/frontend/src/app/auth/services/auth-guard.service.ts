import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthApiActions } from "@frontend/state/actions";
import * as fromAuth from "@frontend/state/selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map((authed) => {
        if (!authed) {
          this.store.dispatch(AuthApiActions.loginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
