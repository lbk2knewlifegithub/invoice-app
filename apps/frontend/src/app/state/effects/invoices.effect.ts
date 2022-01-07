import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import {
  InvoicesAPIActions,
  InvoicesPreviewPageActions,
  LayoutActions,
  ViewInvoicePageActions
} from '../actions';
import { InvoicesFakeService, InvoicesService } from '../services';

@Injectable({ providedIn: 'root' })
export class InvoicesEffects {
  enter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesPreviewPageActions.enter),
      exhaustMap(() =>
        this._invoicesService.getInvoices().pipe(
          map((invoices) =>
            InvoicesAPIActions.loadInvoicesSuccess({ invoices })
          ),
          catchError((error) =>
            of(InvoicesAPIActions.loadInvoicesFailure({ error }))
          )
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ViewInvoicePageActions.deleteInvoice),
      exhaustMap(({ id }) =>
        this._invoicesService.deleteInvoice(id).pipe(
          map(() => InvoicesAPIActions.deleteInvoiceSuccess({ id })),
          tap(() => this._router.navigate(['/invoices'])),
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
      exhaustMap(({ id }) =>
        this._invoicesService.maskAsPaid(id).pipe(
          map(() => InvoicesAPIActions.maskAsPaidSuccess({ id })),
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
      exhaustMap(({ id, updateInvoiceDto }) =>
        this._invoicesService.updateInvoice(id, updateInvoiceDto).pipe(
          map(() =>
            InvoicesAPIActions.updateInvoiceSuccess({ id, updateInvoiceDto })
          ),
          tap(() => this._store.dispatch(LayoutActions.closeEditOverlay())),
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
      exhaustMap(({ createInvoiceDto }) =>
        this._invoicesService.createInvoice(createInvoiceDto).pipe(
          map((invoice) =>
            InvoicesAPIActions.createInvoiceSuccess({ invoice })
          ),
          tap(() =>
            this._store.dispatch(LayoutActions.closeNewInvoiceOverlay())
          ),
          catchError((error) =>
            of(InvoicesAPIActions.createInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(InvoicesFakeService)
    private readonly _invoicesService: InvoicesService,
    private readonly _store: Store,
    private readonly _router: Router
  ) {}
}
