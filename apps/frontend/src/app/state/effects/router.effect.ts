import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import * as fromRoot from "@frontend/state/selectors";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs";
import { LayoutActions } from "../actions";

@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => this._store.select(fromRoot.selectRouteData)),
        map(([, data]) => data["title"]),
        tap((title) => {
          if (title) this._titleService.setTitle(`Invoices - ${title}`);
        })
      ),
    {
      dispatch: false,
    }
  );

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
    private readonly _store: Store,
    private readonly _titleService: Title
  ) {}
}
