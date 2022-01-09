import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CreateInvoiceDto, FilterDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  InvoicesPreviewPageActions,
  LayoutActions
} from "../../../state/actions";
import * as fromRoot from "../../../state/reducers";

@Component({
  selector: "lbk-invoice-preview-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mt-8">
      <div class="container">
        <lbk-invoices-preview-header
          (filter)="filter($event)"
          (newInvoice)="newInvoice()"
          [total]="(totalInvoices$ | async)!"
        ></lbk-invoices-preview-header>

        <ng-container *ngIf="invoices$ | async as invoices">
          <lbk-invoice-preview-list
            class="block mt-8"
            *ngIf="invoices.length > 0; else noInvoices"
            [invoices]="invoices"
          ></lbk-invoice-preview-list>

          <ng-template #noInvoices>
            <lbk-no-invoices class="block mt-[102px]"></lbk-no-invoices>
          </ng-template>
        </ng-container>
      </div>
    </main>

    <!-- new invoice overlay -->
    <lbk-new-invoice-overlay
      (goBack)="goBack()"
      (create)="create($event)"
      (discard)="discard()"
      [open]="(showNewInvoiceOverlay$ | async)!"
    ></lbk-new-invoice-overlay>
    <!-- end new invoice overlay -->
  `,
})
export class InvoicePreviewPageComponent implements OnInit {
  showNewInvoiceOverlay$!: Observable<boolean>;
  invoices$!: Observable<Invoice[]>;
  totalInvoices$!: Observable<number>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.invoices$ = this._store.select(fromRoot.selectSearchResult);
    this.totalInvoices$ = this._store.select(fromRoot.selectTotalInvoices);
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
    this._store.dispatch(LayoutActions.closeNewInvoiceOverlay());
  }
  goBack() {
    this._store.dispatch(LayoutActions.closeNewInvoiceOverlay());
  }

  create(createInvoiceDto: CreateInvoiceDto) {
    this._store.dispatch(
      InvoicesPreviewPageActions.createInvoice({ createInvoiceDto })
    );
  }
}
