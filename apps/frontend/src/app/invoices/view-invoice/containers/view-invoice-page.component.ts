import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpdateInvoiceDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { LayoutActions, ViewInvoicePageActions } from "../../../state/actions";
import * as fromRoot from "../../../state/reducers";

@Component({
  selector: "lbk-view-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-selected-invoice-page></lbk-selected-invoice-page>

    <lbk-edit-overlay
      *ngIf="invoice$ | async as invoice"
      [invoice]="invoice"
      [open]="(showEditOverlay$ | async)!"
      (goBack)="onEditGoBack()"
      (cancel)="onEditCancel()"
      (edit)="edit($event)"
    ></lbk-edit-overlay>
  `,
})
export class ViewInvoicePageComponent extends Unsubscribe implements OnInit {
  showEditOverlay$!: Observable<boolean>;
  invoice$!: Observable<Invoice | null | "" | undefined>;

  constructor(
    private readonly _store: Store,
    private readonly _route: ActivatedRoute
  ) {
    super();
    this.appendSub = this._route.params
      .pipe(
        map((params) =>
          ViewInvoicePageActions.selectInvoice({ id: params["id"] })
        )
      )
      .subscribe((action) => this._store.dispatch(action));
  }

  ngOnInit(): void {
    this.showEditOverlay$ = this._store.select(fromRoot.selectShowEditOverlay);
    this.invoice$ = this._store.select(fromRoot.selectSelectedInvoice);
  }

  onEditGoBack() {
    this._store.dispatch(LayoutActions.closeEditOverlay());
  }

  onEditCancel() {
    this._store.dispatch(LayoutActions.closeEditOverlay());
  }

  edit({
    id,
    updateInvoiceDto,
  }: {
    id: string;
    updateInvoiceDto: UpdateInvoiceDto;
  }) {
    this._store.dispatch(
      ViewInvoicePageActions.updateInvoice({ id, updateInvoiceDto })
    );
  }
}
