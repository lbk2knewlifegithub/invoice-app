import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { loginSuccess } from "@frontend/state/actions/auth/auth-api.actions";
import * as fromAuth from "@frontend/state/selectors/auth.selector";
import { AuthService, TokenService } from "@frontend/state/services";
import { Store } from "@ngrx/store";
import {
  catchError,
  exhaustMap,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap
} from "rxjs";

@Injectable({ providedIn: "root" })
export class InvoicesPreviewGuard implements CanActivate {
  constructor(
    private readonly _store: Store,
    private readonly _authService: AuthService,
    private readonly _tokenService: TokenService
  ) {}

  getAccessToken(): Observable<string> {
    return this._tokenService.getToken().pipe(
      map((token) => {
        if (!token) throw Error("Token not found");

        return token.accessToken;
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._store.select(fromAuth.selectLoggedIn).pipe(
      take(1),
      exhaustMap((authed) => {
        if (!authed)
          return this.getAccessToken().pipe(
            switchMap((token) => this._authService.me(token)),
            tap((user) => {
              if (user) this._store.dispatch(loginSuccess({ user }));
            }),
            map((user) => !!user)
          );
        return of(true);
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
