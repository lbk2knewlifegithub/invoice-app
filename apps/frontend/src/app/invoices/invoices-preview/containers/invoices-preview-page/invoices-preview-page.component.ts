import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  InvoicesPreviewPageActions,
  LayoutActions
} from "@frontend/state/actions";
import * as fromRoot from "@frontend/state/selectors";
import { CreateInvoiceDto, FilterDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NewInvoiceOverlayComponent } from "../../components/new-invoice-overlay";

@Component({
  selector: "lbk-invoice-preview-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoices-preview-page.component.html",
})
export class InvoicePreviewPageComponent implements OnInit {
  showNewInvoiceOverlay$!: Observable<boolean>;
  invoices$!: Observable<Invoice[]>;
  totalInvoices$!: Observable<number>;
  searchStatus$!: Observable<string[]>;

  @ViewChild(NewInvoiceOverlayComponent)
  newInvoiceOverlayComponent!: NewInvoiceOverlayComponent;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.invoices$ = this._store.select(fromRoot.selectSearchResult);
    this.totalInvoices$ = this._store.select(fromRoot.selectTotalInvoices);
    this.searchStatus$ = this._store.select(fromRoot.selectSearchInvoiceStatus);
    this.showNewInvoiceOverlay$ = this._store.select(
      fromRoot.selectShowNewInvoiceOverlay
    );

    this._store.dispatch(InvoicesPreviewPageActions.enter());
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

  create(createInvoiceDto: CreateInvoiceDto) {
    this._store.dispatch(
      InvoicesPreviewPageActions.createInvoice({ createInvoiceDto })
    );
  }
}
