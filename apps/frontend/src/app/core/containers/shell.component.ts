import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutActions } from "@frontend/state/actions";
import * as fromRoot from "@frontend/state/selectors";
import { slideInAnimation } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "lbk-shell-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header
      [darkTheme]="(darkTheme$ | async)!"
      (toDarkTheme)="toDarkTheme()"
      (toLightTheme)="toLightTheme()"
      [openOverlay]="(openOverlay$ | async)!"
    ></lbk-header>

    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <!-- <lbk-footer></lbk-footer> -->
  `,
  animations: [slideInAnimation],
})
export class ShellComponent implements OnInit {
  openOverlay$!: Observable<boolean>;
  darkTheme$!: Observable<boolean>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.openOverlay$ = this._store.select(fromRoot.selectShowOverlay);
    this.darkTheme$ = this._store.select(fromRoot.selectDarkThem);

    this._store.dispatch(LayoutActions.loadTheme());
  }
  toDarkTheme() {
    this._store.dispatch(LayoutActions.toDarkTheme());
  }
  toLightTheme() {
    this._store.dispatch(LayoutActions.toLightTheme());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.["animation"];
  }
}
