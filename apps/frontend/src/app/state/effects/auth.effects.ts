import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@frontend/auth/services";
import {
  AuthActions,
  AuthApiActions,
  LoginPageActions,
  UserActions
} from "@frontend/state/actions";
import { Credentials } from "@lbk/models";
import { DialogService } from "@lbk/ui";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((auth: Credentials) =>
        this._authService.login(auth).pipe(
          map((user) => AuthApiActions.loginSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this._router.navigate(["/"]))
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap((authed) => {
          this._router.navigate(["/login"]);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        // TODO
        return of(true);
      }),
      map((result) =>
        result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _dialogService: DialogService
  ) {}
}