import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Invoice } from '@lbk/models';
import { DialogService } from '@lbk/ui';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { LayoutActions, ViewInvoicePageActions } from '../../../state/actions';
import * as fromRoot from '../../../state/reducers';

@Component({
  selector: 'lbk-selected-invoice-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main *ngIf="invoice$ | async as invoice" class="mt-8">
      <div class="container">
        <lbk-go-back></lbk-go-back>

        <lbk-invoice-detail
          class="block mt-8"
          [invoice]="invoice"
        ></lbk-invoice-detail>
      </div>

      <lbk-invoice-details-actions
        class="block mt-14"
        (edit)="edit()"
        (delete)="delete(invoice.id)"
        (maskAsPaid)="maskAsPaid(invoice.id)"
      ></lbk-invoice-details-actions>
    </main>
  `,
})
export class SelectedInvoicePageComponent implements OnInit {
  invoice$!: Observable<Invoice | null | undefined | ''>;

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
