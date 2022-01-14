import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from "@angular/router";
import { combineLatest, map, Observable } from "rxjs";
import { InvoicePreviewPageComponent } from "./containers/invoices-preview-page/invoices-preview-page.component";

@Injectable({ providedIn: "root" })
export class PendingGuard
  implements CanDeactivate<InvoicePreviewPageComponent>
{
  canDeactivate(
    component: InvoicePreviewPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest([
      component.pendingSaveAsDraft$,
      component.pendingCreate$,
    ]).pipe(
      map(
        ([pendingSaveAsDraft, pendingCreate]) =>
          !pendingSaveAsDraft && !pendingCreate
      )
    );
  }
}
