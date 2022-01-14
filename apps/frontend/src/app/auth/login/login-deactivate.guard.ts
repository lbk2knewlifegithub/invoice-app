import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from "@angular/router";
import { map, Observable } from "rxjs";
import { LoginPageComponent } from "./containers/login-page.component";

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({ providedIn: "root" })
export class LoginCanDeactivateGuard
  implements CanDeactivate<LoginPageComponent>
{
  canDeactivate(
    component: LoginPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    return component.pending$.pipe(map((pending) => !pending));
  }
}
