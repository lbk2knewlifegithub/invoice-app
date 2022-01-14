import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDto } from "@frontend/dto";
import * as fromRoot from "@frontend/state/selectors";
import * as fromEditInvoice from "@frontend/state/selectors/invoices/edit-invoice.secltor";
import { Invoice } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { LayoutActions, ViewInvoicePageActions } from "../../../state/actions";
import { EditOverlayComponent } from "../components/edit-invoice-overlay/edit-overlay.component";

@Component({
  selector: "lbk-view-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main *ngIf="invoice$ | async as invoice">
      <lbk-selected-invoice-page></lbk-selected-invoice-page>

      <lbk-edit-overlay
        [invoice]="invoice"
        [open]="(showEditOverlay$ | async)!"
        [pending]="(pending$ | async)!"
        (cancel)="onEditCancel()"
        (edit)="edit($event)"
      ></lbk-edit-overlay>
    </main>
  `,
})
export class ViewInvoicePageComponent extends Unsubscribe implements OnInit {
  showEditOverlay$!: Observable<boolean>;
  pending$!: Observable<boolean>;
  invoice$!: Observable<Invoice | null | 0 | undefined>;

  @ViewChild(EditOverlayComponent)
  editOverLayComponent!: EditOverlayComponent;

  constructor(
    private readonly _store: Store,
    private readonly _route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.appendSub = this._route.params
      .pipe(
        map((params) =>
          ViewInvoicePageActions.selectInvoice({ id: params["id"] })
        )
      )
      .subscribe((action) => this._store.dispatch(action));

    this.showEditOverlay$ = this._store.select(fromRoot.selectShowEditOverlay);
    this.pending$ = this._store.select(
      fromEditInvoice.selectEditInvoicePending
    );
    this.invoice$ = this._store.select(fromRoot.selectSelectedInvoice);
  }

  onEditCancel() {
    this._store.dispatch(LayoutActions.closeAllOverlay());
  }

  edit({ id, invoiceDto }: { id: number; invoiceDto: InvoiceDto }) {
    this._store.dispatch(
      ViewInvoicePageActions.updateInvoice({ id, invoiceDto: invoiceDto })
    );
  }
}
