import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DialogService } from "@frontend/shared/dialogs";
import { LayoutActions, ViewInvoicePageActions } from "@frontend/state/actions";
import * as fromRoot from "@frontend/state/selectors";
import * as fromViewInvoicePage from "@frontend/state/selectors/invoices/view-invoice-page.selector";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { Store } from "@ngrx/store";
import { combineLatest, map, Observable, take } from "rxjs";

@Component({
  selector: "lbk-selected-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./selected-invoice-page.component.html",
})
export class SelectedInvoicePageComponent implements OnInit {
  invoice$!: Observable<Invoice | null | undefined | 0>;
  pending$!: Observable<boolean>;
  error$!: Observable<string | null>;

  disabledMaskAsPaid$!: Observable<boolean>;

  constructor(
    private readonly _store: Store,
    private readonly _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.invoice$ = this._store.select(fromRoot.selectSelectedInvoice);
    this.pending$ = this._store.select(
      fromViewInvoicePage.selectViewInvoicePagePending
    );
    this.error$ = this._store.select(
      fromViewInvoicePage.selectViewInvoicePageError
    );

    this.disabledMaskAsPaid$ = combineLatest([
      this.pending$,
      this.invoice$,
    ]).pipe(
      map(
        ([pending, invoice]) =>
          pending || (invoice as Invoice)?.status === InvoiceStatus.PAID
      )
    );
  }

  edit() {
    this._store.dispatch(LayoutActions.showEditOverlay());
  }

  delete(id: number) {
    this._dialogService
      .deleteDialog(id)
      .pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed)
          return this._store.dispatch(
            ViewInvoicePageActions.deleteInvoice({ id })
          );
      });
  }

  maskAsPaid(id: number) {
    this._store.dispatch(ViewInvoicePageActions.maskAsPaid({ id }));
  }

  isPaid(invoice: Invoice) {
    return invoice.status === InvoiceStatus.PAID;
  }
}
