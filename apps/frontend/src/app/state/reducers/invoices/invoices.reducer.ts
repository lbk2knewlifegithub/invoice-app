import { Invoice, InvoiceStatus } from "@lbk/models";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {
  InvoiceActions,
  InvoicesAPIActions,
  ViewInvoicePageActions
} from "../../actions";

export const invoicesFeatureKey = "invoices";

export interface State extends EntityState<Invoice> {
  selectedInvoiceId: number | null;
}

export const adapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>({
  selectId: (invoice: Invoice) => invoice.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedInvoiceId: null,
  filter: [],
});

export const reducer = createReducer(
  initialState,
  on(
    // BooksApiActions.searchSuccess,
    InvoicesAPIActions.loadInvoicesSuccess,
    (state, { invoices }) => adapter.addMany(invoices, state)
  ),
  on(
    InvoiceActions.loadInvoice,
    InvoicesAPIActions.createInvoiceSuccess,
    (state, { invoice }) => adapter.addOne(invoice, state)
  ),
  on(InvoicesAPIActions.deleteInvoiceSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(InvoicesAPIActions.maskAsPaidSuccess, (state, { id }) =>
    adapter.updateOne({ id, changes: { status: InvoiceStatus.PAID } }, state)
  ),
  // Update Invoice Success
  on(
    InvoicesAPIActions.updateInvoiceSuccess,
    (state, { id, updateInvoiceDto }) =>
      adapter.updateOne({ id, changes: { ...updateInvoiceDto } }, state)
  ),
  on(ViewInvoicePageActions.selectInvoice, (state, { id }) => ({
    ...state,
    selectedInvoiceId: id,
  }))
);

export const selectId = (state: State) => state.selectedInvoiceId;
