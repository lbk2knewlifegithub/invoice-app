import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CAROUSEL_ROUTE_ANIMATION } from "@lbk/ui";

@Component({
  selector: "lbk-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <div [@routeAnimations]="prepareRoute(outlet)"> -->
    <router-outlet #outlet="outlet"></router-outlet>
    <!-- </div> -->
  `,
  animations: [CAROUSEL_ROUTE_ANIMATION],
})
export class AppComponent {
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet?.activatedRouteData?.["animation"];
  // }
}
