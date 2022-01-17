import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
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
            switchMap((token) => this._authService.me(token)),
            map((user) => !!user)
          );
        return of(true);
      }),
      catchError(() => of(true))
    );
  }
}
