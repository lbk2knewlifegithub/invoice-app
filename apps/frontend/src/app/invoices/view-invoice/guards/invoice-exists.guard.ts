import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { INVOICES_SERVICE } from "@frontend/constants";
import { InvoiceActions } from "@frontend/state/actions";
import * as fromInvoices from "@frontend/state/selectors/invoices.selector";
import { InvoicesService } from "@frontend/state/services";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { ViewInvoicePageActions } from "../actions";

@Injectable({
  providedIn: "root",
})
export class InvoiceExistsGuard implements CanActivate {
  constructor(
    private readonly _store: Store,
    @Inject(INVOICES_SERVICE)
    private readonly _invoicesService: Observable<InvoicesService>,
    private readonly _router: Router
  ) {}

  hasInvoiceInStore(id: number): Observable<boolean> {
    return this._store.select(fromInvoices.selectInvoiceEntities).pipe(
      map((entities) => entities[id]),
      tap((invoice) => {
        if (invoice)
          this._store.dispatch(ViewInvoicePageActions.selectInvoice({ id }));
      }),
      map((invoice) => !!invoice),
      take(1)
    );
  }

  hasInvoiceInApi(id: number): Observable<boolean> {
    return this._invoicesService.pipe(
      switchMap((service) =>
        service.retrieveInvoice(id).pipe(
          map((invoiceEntity) =>
            InvoiceActions.loadInvoice({ invoice: invoiceEntity })
          ),
          tap((action) => this._store.dispatch(action)),
          map((invoice) => !!invoice),
          catchError(() => {
            this._router.navigate(["/"]);
            return of(false);
          })
        )
      )
    );
  }

  hasInvoice(id: number): Observable<boolean> {
    return this.hasInvoiceInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasInvoiceInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasInvoice(route.params["id"]);
  }
}
