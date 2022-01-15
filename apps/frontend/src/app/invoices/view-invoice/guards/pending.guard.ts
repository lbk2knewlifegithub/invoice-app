import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from "@angular/router";
import { combineLatest, map, Observable } from "rxjs";
import { ViewInvoicePageComponent } from "../containers/view-invoice-page.component";

@Injectable({ providedIn: "root" })
export class PendingGuard implements CanDeactivate<ViewInvoicePageComponent> {
  canDeactivate(
    component: ViewInvoicePageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    const { pendingDelete$, pendingMaskAsPaid$, pendingSaveAndChange$ } =
      component;
    return combineLatest([
      pendingDelete$,
      pendingMaskAsPaid$,
      pendingSaveAndChange$,
    ]).pipe(
      map(
        ([pendingDelete, pendingMaskAsPaid, pendingSaveAndChange]) =>
          !pendingDelete && !pendingMaskAsPaid && !pendingSaveAndChange
      )
    );
  }
}
