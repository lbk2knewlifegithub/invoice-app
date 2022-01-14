import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from "@angular/router";
import { map, Observable } from "rxjs";
import { SignUpPageComponent } from "./containers/sign-up-page.component";

@Injectable({ providedIn: "root" })
export class SignUpCanDeactivateGuard
  implements CanDeactivate<SignUpPageComponent>
{
  canDeactivate(
    component: SignUpPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    return component.pending$.pipe(map((pending) => !pending));
  }
}
