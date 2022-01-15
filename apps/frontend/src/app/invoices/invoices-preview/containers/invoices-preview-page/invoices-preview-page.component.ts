import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { FilterDto, InvoiceDto } from "@frontend/dto";
import {
  InvoicesPreviewPageActions,
  LayoutActions
} from "@frontend/state/actions";
import * as fromRoot from "@frontend/state/selectors";
import * as fromNewInvoice from "@frontend/state/selectors/invoices/new-invoice.selector";
import * as fromLayout from "@frontend/state/selectors/layout.selector";
import { Invoice } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NewInvoiceOverlayComponent } from "../../components/new-invoice-overlay";

@Component({
  selector: "lbk-invoice-preview-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoices-preview-page.component.html",
})
export class InvoicePreviewPageComponent extends Unsubscribe implements OnInit {
  showNewInvoiceOverlay$!: Observable<boolean>;
  invoices$!: Observable<Invoice[]>;
  totalInvoices$!: Observable<number>;
  searchStatus$!: Observable<string[]>;

  // new invoice overlay
  pendingSaveAsDraft$!: Observable<boolean>;
  pendingCreate$!: Observable<boolean>;

  @ViewChild(NewInvoiceOverlayComponent)
  newInvoiceOverlayComponent!: NewInvoiceOverlayComponent;

  constructor(private readonly _store: Store, private readonly _title: Title) {
    super();
  }

  ngOnInit(): void {
    this.invoices$ = this._store.select(fromRoot.selectSearchResult);
    this.totalInvoices$ = this._store.select(fromRoot.selectTotalInvoices);
    this.searchStatus$ = this._store.select(fromRoot.selectSearchInvoiceStatus);
    this.showNewInvoiceOverlay$ = this._store.select(
      fromLayout.selectShowNewInvoiceOverlay
    );

    this.pendingSaveAsDraft$ = this._store.select(
      fromNewInvoice.selectPendingSaveAsDraft
    );

    this.pendingCreate$ = this._store.select(
      fromNewInvoice.selectPendingCreate
    );

    this._store.dispatch(InvoicesPreviewPageActions.enter());

    this.appendSub = this.totalInvoices$.subscribe((total) => {
      if (total === 0) return this._title.setTitle("Invoices");
      this._title.setTitle(`Invoices - ${total} invoices`);
    });
  }

  filter(filterDto: FilterDto): void {
    this._store.dispatch(InvoicesPreviewPageActions.filter({ filterDto }));
  }

  newInvoice() {
    this._store.dispatch(LayoutActions.showNewInvoiceOverlay());
  }

  discard() {
    this._store.dispatch(LayoutActions.closeAllOverlay());
  }

  create(createInvoiceDto: InvoiceDto) {
    this._store.dispatch(
      InvoicesPreviewPageActions.createInvoice({ invoiceDto: createInvoiceDto })
    );
  }
}
