import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import * as fromRoot from "@frontend/state/reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "lbk-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header [openOverlay]="(openOverlay$ | async)!"></lbk-header>
    <router-outlet></router-outlet>
    <!-- <lbk-footer></lbk-footer> -->
  `,
})
export class AppComponent implements OnInit {
  openOverlay$!: Observable<boolean>;

  constructor(private readonly _store: Store) {}
  ngOnInit(): void {
    this.openOverlay$ = this._store.select(fromRoot.selectShowOverlay);
  }
}
