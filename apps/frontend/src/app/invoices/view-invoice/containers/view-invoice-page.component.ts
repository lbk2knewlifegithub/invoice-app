import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpdateInvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Unsubscribe } from "@lbk/ui";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { LayoutActions, ViewInvoicePageActions } from "../../../state/actions";
import * as fromRoot from "@frontend/state/selectors";
import { EditOverlayComponent } from "../components/edit-invoice-overlay";

@Component({
  selector: "lbk-view-invoice-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main *ngIf="invoice$ | async as invoice">
      <lbk-selected-invoice-page></lbk-selected-invoice-page>

      <lbk-edit-overlay
        [invoice]="invoice"
        [open]="(showEditOverlay$ | async)!"
        (cancel)="onEditCancel()"
        (edit)="edit($event)"
      ></lbk-edit-overlay>
    </main>
  `,
})
export class ViewInvoicePageComponent extends Unsubscribe implements OnInit {
  showEditOverlay$!: Observable<boolean>;
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
    this.invoice$ = this._store.select(fromRoot.selectSelectedInvoice);
  }

  onEditCancel() {
    this._store.dispatch(LayoutActions.closeAllOverlay());
  }

  edit({
    id,
    updateInvoiceDto,
  }: {
    id: number;
    updateInvoiceDto: UpdateInvoiceDto;
  }) {
    this._store.dispatch(
      ViewInvoicePageActions.updateInvoice({ id, updateInvoiceDto })
    );
  }
}
