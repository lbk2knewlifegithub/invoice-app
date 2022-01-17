import { inject, InjectionToken } from "@angular/core";
import * as fromAuth from "@frontend/state/selectors/auth.selector";
import {
  InvoicesFakeService,
  InvoicesImplService
} from "@frontend/state/services";
import { Store } from "@ngrx/store";
import { map } from "rxjs";

export const INVOICES_SERVICE = new InjectionToken("Invoice Service", {
  factory: () => {
    const invoicesImplService = inject(InvoicesImplService);
    const invoicesFakeService = inject(InvoicesFakeService);
    const store = inject(Store);

    const loggedIn$ = store.select(fromAuth.selectLoggedIn);
    return loggedIn$.pipe(
      map((loggedIn) => (loggedIn ? invoicesImplService : invoicesFakeService))
    );
  },
});
