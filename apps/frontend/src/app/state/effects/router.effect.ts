import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { LayoutActions } from "../actions";

@Injectable()
export class RouterEffects {
  autoCloseOverlay$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        tap(() => this._store.dispatch(LayoutActions.closeAllOverlay()))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store
  ) {}
}
