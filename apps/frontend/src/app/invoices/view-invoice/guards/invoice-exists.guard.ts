import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import * as fromRoot from "@frontend/state/selectors";
import { InvoicesImplService, InvoicesService } from "@frontend/state/services";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { InvoiceActions } from "../../../state/actions";

@Injectable({
  providedIn: "root",
})
export class InvoiceExistsGuard implements CanActivate {
  constructor(
    private readonly _store: Store,
    @Inject(InvoicesImplService)
    private readonly _invoicesService: InvoicesService,
    private readonly _router: Router
  ) {}

  hasInvoiceInStore(id: number): Observable<boolean> {
    return this._store.select(fromRoot.selectInvoiceEntities).pipe(
      map((entities) => !!entities[id]),
      take(1)
    );
  }

  hasInvoiceInApi(id: number): Observable<boolean> {
    return this._invoicesService.retrieveInvoice(id).pipe(
      map((invoiceEntity) =>
        InvoiceActions.loadInvoice({ invoice: invoiceEntity })
      ),
      tap((action) => this._store.dispatch(action)),
      map((invoice) => !!invoice),
      catchError(() => {
        this._router.navigate(["/"]);
        return of(false);
      })
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
