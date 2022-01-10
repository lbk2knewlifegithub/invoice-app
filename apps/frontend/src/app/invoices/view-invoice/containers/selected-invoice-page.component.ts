import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Invoice } from "@lbk/models";
import { DialogService } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { LayoutActions, ViewInvoicePageActions } from "../../../state/actions";
import * as fromRoot from "../../../state/reducers";

@Component({
  selector: "lbk-selected-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="invoice$ | async as invoice"
      class="pt-8 md:pt-14 lg:pt-16 lg:grid lg:place-content-center "
    >
      <div class="container max-w-[730px] w-full md:min-w-[730px] lg:h-full">
        <lbk-go-back></lbk-go-back>

        <lbk-invoice-detail
          class="block mt-8"
          [invoice]="invoice"
          (edit)="edit()"
          (delete)="delete(invoice.id)"
          (maskAsPaid)="maskAsPaid(invoice.id)"
        ></lbk-invoice-detail>
      </div>

      <lbk-invoice-details-actions
        class="block mt-14 md:hidden"
        (edit)="edit()"
        (delete)="delete(invoice.id)"
        (maskAsPaid)="maskAsPaid(invoice.id)"
      ></lbk-invoice-details-actions>
    </div>
  `,
})
export class SelectedInvoicePageComponent implements OnInit {
  invoice$!: Observable<Invoice | null | undefined | "">;

  constructor(
    private readonly _store: Store,
    private readonly _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.invoice$ = this._store.select(fromRoot.selectSelectedInvoice);
  }

  edit() {
    this._store.dispatch(LayoutActions.showEditOverlay());
  }

  delete(id: string) {
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

  maskAsPaid(id: string) {
    this._store.dispatch(ViewInvoicePageActions.maskAsPaid({ id }));
  }
}
