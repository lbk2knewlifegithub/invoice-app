import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthActions, LayoutActions } from "@frontend/state/actions";
import * as fromAuth from "@frontend/state/selectors/auth.selector";
import * as fromLayout from "@frontend/state/selectors/layout.selector";
import { CAROUSEL_ROUTE_ANIMATION } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "lbk-shell-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header
      [darkTheme]="(darkTheme$ | async)!"
      [openOverlay]="(openOverlay$ | async)!"
      [loggedIn]="(loggedIn$ | async)!"
      (toDarkTheme)="toDarkTheme()"
      (toLightTheme)="toLightTheme()"
      (logout)="logout()"
    ></lbk-header>

    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <!-- <lbk-footer></lbk-footer> -->
  `,
  animations: [CAROUSEL_ROUTE_ANIMATION],
})
export class ShellComponent implements OnInit {
  openOverlay$!: Observable<boolean>;
  darkTheme$!: Observable<boolean>;
  loggedIn$!: Observable<boolean>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.openOverlay$ = this._store.select(fromLayout.selectShowOverlay);
    this.darkTheme$ = this._store.select(fromLayout.selectDarkThem);

    this.loggedIn$ = this._store.select(fromAuth.selectLoggedIn);

    this._store.dispatch(LayoutActions.loadTheme());
  }

  toDarkTheme() {
    this._store.dispatch(LayoutActions.toDarkTheme());
  }

  toLightTheme() {
    this._store.dispatch(LayoutActions.toLightTheme());
  }

  logout() {
    this._store.dispatch(AuthActions.logoutConfirmation());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.["animation"];
  }
}
