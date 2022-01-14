import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { AuthApiActions } from "@frontend/state/actions";
import * as fromAuth from "@frontend/state/selectors/auth/auth.selector";
import { AuthService, TokenService } from "@frontend/state/services";
import { Store } from "@ngrx/store";
import {
  catchError,
  exhaustMap,
  map,
  Observable,
  of,
  switchMap,
  take
} from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.select(fromAuth.selectLoggedIn).pipe(
      take(1),
      exhaustMap((authed) => {
        if (!authed)
          return this.getAccessToken().pipe(
            switchMap((token) => this._authService.me(token))
          );
        return of(true);
      }),
      catchError(() => {
        this._store.dispatch(AuthApiActions.loginRedirect());
        return of(false);
      })
    );
  }
}
