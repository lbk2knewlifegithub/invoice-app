import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ViewInvoicePageActions } from "@frontend/invoices/view-invoice/actions"
import * as fromInvoices from "@frontend/state/selectors/invoices/invoices.selector";
import { Invoice } from "@lbk/models";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";

@Injectable({ providedIn: "root" })
export class ViewInvoiceResolver
  implements Resolve<Invoice | null | 0 | undefined>
{
  invoice$!: Observable<Invoice | null | 0 | undefined>;
  constructor(private readonly _store: Store, ) {
    this.invoice$ = this._store.select(fromInvoices.selectSelectedInvoice);
  }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Invoice | null | 0 | undefined> {
    const id = route.params["id"];
    this._store.dispatch(ViewInvoicePageActions.selectInvoice({ id }));

    return this.invoice$.pipe(take(1));
  }
}
