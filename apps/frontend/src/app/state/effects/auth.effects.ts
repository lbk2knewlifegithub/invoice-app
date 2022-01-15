import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginPageActions } from "@frontend/auth/login/actions";
import { SignUpPageActions } from "@frontend/auth/sign-up/actions";
import { DialogService } from "@frontend/shared/dialogs";
import {
  AuthActions,
  AuthApiActions,
  UserActions
} from "@frontend/state/actions";
import { AuthService, TokenService } from "@frontend/state/services";
import { Credentials } from "@lbk/models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((credentials: Credentials) =>
        this._authService.login(credentials).pipe(
          map((token) => this._tokenService.saveAndDecode(token)),
          map((user) => AuthApiActions.loginSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SignUpPageActions.signUp),
      map((action) => action.credentials),
      exhaustMap((credentials: Credentials) =>
        this._authService.signup(credentials).pipe(
          map((token) => this._tokenService.saveAndDecode(token)),
          map((user) => AuthApiActions.signUpSuccess({ user })),
          catchError((error) => of(AuthApiActions.signUpFailure({ error })))
        )
      )
    )
  );

  authenticationSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginSuccess, AuthApiActions.signUpSuccess),
        tap(() => this._router.navigate(["/"]))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this._tokenService.clear()),
        tap(() => this._router.navigate(["/login"]))
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

  invoicesPreviewRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.invoicesPreviewRedirect),
        tap((authed) => {
          this._router.navigate(["/invoices"]);
        })
      ),
    { dispatch: false }
  );

  signUpRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.signUpRedirect),
        tap((authed) => {
          this._router.navigate(["/signup"]);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => this._dialogService.confirmLogout()),
      tap((result) => console.log(result)),
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
    private readonly _dialogService: DialogService,
    private readonly _tokenService: TokenService
  ) {}
}
