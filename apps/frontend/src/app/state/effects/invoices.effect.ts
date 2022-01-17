import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { INVOICES_SERVICE } from "@frontend/constants";
import { ViewInvoicePageActions } from "@frontend/invoices/view-invoice/actions";
import { SnackBarService } from "@frontend/shared/snackbar";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, of, tap } from "rxjs";
import {
  AuthApiActions,
  InvoicesAPIActions,
  InvoicesPreviewPageActions,
  LayoutActions
} from "../actions";
import { InvoicesService } from "../services";

@Injectable({ providedIn: "root" })
export class InvoicesEffects {
  loginSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthApiActions.loginSuccess, InvoicesPreviewPageActions.enter),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([_, service]) => {
        return service.getInvoices().pipe(
          map((invoices) =>
            InvoicesAPIActions.loadInvoicesSuccess({ invoices })
          ),
          catchError((error) =>
            of(InvoicesAPIActions.loadInvoicesFailure({ error }))
          )
        );
      })
    )
  );

  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ViewInvoicePageActions.deleteInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ id }, service]) =>
        service.deleteInvoice(id).pipe(
          map(() => InvoicesAPIActions.deleteInvoiceSuccess({ id })),
          tap(() => this._router.navigate(["/invoices"])),
          catchError((error) =>
            of(InvoicesAPIActions.deleteInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  maskAsPaid$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ViewInvoicePageActions.maskAsPaid),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ id }, service]) =>
        service.maskAsPaid(id).pipe(
          map(() => InvoicesAPIActions.maskAsPaidSuccess({ id })),
          tap(() => this._snackBarService.maskAsPaid(id)),
          catchError((error) =>
            of(InvoicesAPIActions.maskAsPaidFailure({ error }))
          )
        )
      )
    )
  );

  editInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ViewInvoicePageActions.updateInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ id, invoiceDto }, service]) =>
        service.editInvoice(id, invoiceDto).pipe(
          map(() =>
            InvoicesAPIActions.editInvoiceSuccess({
              id,
              invoiceDto: invoiceDto,
            })
          ),
          tap(() => this._store.dispatch(LayoutActions.closeAllOverlay())),
          catchError((error) =>
            of(InvoicesAPIActions.editInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  createInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesPreviewPageActions.createInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ invoiceDto: createInvoiceDto }, service]) =>
        service.createInvoice(createInvoiceDto).pipe(
          map((invoice) =>
            InvoicesAPIActions.createInvoiceSuccess({ invoice })
          ),
          tap(() => this._store.dispatch(LayoutActions.closeAllOverlay())),
          catchError((error) =>
            of(InvoicesAPIActions.createInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _snackBarService: SnackBarService,
    @Inject(INVOICES_SERVICE)
    private readonly _invoicesService: Observable<InvoicesService>
  ) {}
}
