import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ROUTE_ANIMATION } from "@lbk/ui";

@Component({
  selector: "lbk-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  animations: [ROUTE_ANIMATION],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.["animation"];
  }
}
