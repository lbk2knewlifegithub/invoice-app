import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { InvoiceDto } from "@frontend/dto";
import { ViewInvoicePageActions } from "@frontend/invoices/view-invoice/actions";
import { DialogService } from "@frontend/shared";
import * as fromRoot from "@frontend/state/selectors";
import * as fromInvoices from "@frontend/state/selectors/invoices/invoices.selector";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { LayoutActions } from "../../../state/actions";
import { EditOverlayComponent } from "../components/edit-invoice-overlay/edit-overlay.component";
import * as fromViewInvoicePage from "../reducers";

@Component({
  selector: "lbk-view-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./view-invoice-page.component.html",
})
export class ViewInvoicePageComponent extends Unsubscribe implements OnInit {
  showEditOverlay$!: Observable<boolean>;
  pendingSaveAndChange$!: Observable<boolean>;
  pendingMaskAsPaid$!: Observable<boolean>;
  pendingDelete$!: Observable<boolean>;

  error$!: Observable<string | null>;

  invoice$!: Observable<Invoice | null | 0 | undefined>;

  @ViewChild(EditOverlayComponent)
  editOverLayComponent!: EditOverlayComponent;

  constructor(
    private readonly _store: Store,
    private readonly _dialogService: DialogService,
    private readonly _title: Title
  ) {
    super();
  }

  ngOnInit(): void {
    this.invoice$ = this._store.select(fromInvoices.selectSelectedInvoice);

    this.showEditOverlay$ = this._store.select(fromRoot.selectShowEditOverlay);
    this.pendingSaveAndChange$ = this._store.select(
      fromViewInvoicePage.selectPendingSaveAndChange
    );
    this.pendingMaskAsPaid$ = this._store.select(
      fromViewInvoicePage.selectPendingMaskAsPaid
    );

    this.pendingDelete$ = this._store.select(
      fromViewInvoicePage.selectPendingDelete
    );

    // Set title
    this.appendSub = this.invoice$.subscribe((invoice) =>
      this._title.setTitle(
        `Invoices - ${invoice ? (invoice as Invoice).id : 0}`
      )
    );
  }

  onEditCancel() {
    this._store.dispatch(LayoutActions.closeAllOverlay());
  }

  showEditOverlay() {
    this._store.dispatch(LayoutActions.showEditOverlay());
  }

  edit({ id, invoiceDto }: { id: number; invoiceDto: InvoiceDto }) {
    this._store.dispatch(ViewInvoicePageActions.updateInvoice({ id, invoiceDto: invoiceDto }));
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

  isPaid(invoice: Invoice) {
    return invoice.status === InvoiceStatus.PAID;
  }

  maskAsPaid(id: number) {
    this._store.dispatch(ViewInvoicePageActions.maskAsPaid({ id }));
  }
}
