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
import * as fromAuth from "@frontend/state/selectors/auth.selector";
import * as fromLayout from "@frontend/state/selectors/layout.selector";
import * as fromSearch from "@frontend/state/selectors/search.selector";
import { Invoice } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { NewInvoiceOverlayComponent } from "../../components/new-invoice-overlay";
import * as fromInvoicesPreviewPage from "../../reducers";

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
  loadingInvoices$!: Observable<boolean>;
  loaded$!: Observable<boolean>;

  loggedIn$!: Observable<boolean>;

  @ViewChild(NewInvoiceOverlayComponent)
  newInvoiceOverlayComponent!: NewInvoiceOverlayComponent;

  constructor(private readonly _store: Store, private readonly _title: Title) {
    super();
  }

  ngOnInit(): void {
    this.invoices$ = this._store.select(fromSearch.selectSearchResult);

    this.loggedIn$ = this._store.select(fromAuth.selectLoggedIn);

    this.totalInvoices$ = this._store.select(fromSearch.selectTotalInvoices);

    this.searchStatus$ = this._store.select(
      fromSearch.selectSearchInvoiceStatus
    );

    this.loaded$ = this._store.select(fromInvoicesPreviewPage.selectLoaded);

    this.showNewInvoiceOverlay$ = this._store.select(
      fromLayout.selectShowNewInvoiceOverlay
    );

    this.pendingSaveAsDraft$ = this._store.select(
      fromInvoicesPreviewPage.selectPendingSaveAsDraft
    );

    this.pendingCreate$ = this._store.select(
      fromInvoicesPreviewPage.selectPendingCreate
    );

    this.loadingInvoices$ = this._store.select(
      fromInvoicesPreviewPage.selectLoadingInvoices
    );

    this.loadingInvoices$.subscribe(console.log)

    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (loaded) return;
      this._store.dispatch(InvoicesPreviewPageActions.enter());
    });

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
