import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { LayoutActions } from "../actions";
import { ThemeService } from "../services";

@Injectable({ providedIn: "root" })
export class LayoutEffects {
  toDarkThem$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LayoutActions.toDarkTheme),
        tap(() => this._themeService.toDarkTheme())
      ),
    { dispatch: false }
  );

  toLightTheme$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LayoutActions.toLightTheme),
        tap(() => this._themeService.toLightTheme())
      ),
    { dispatch: false }
  );

  loadTheme$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LayoutActions.loadTheme),
      exhaustMap(() =>
        this._themeService.getTheme().pipe(
          map((darkTheme) =>
            darkTheme
              ? LayoutActions.toDarkTheme()
              : LayoutActions.toLightTheme()
          ),
          catchError((_) => of(LayoutActions.toLightTheme()))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _themeService: ThemeService
  ) {}
}
