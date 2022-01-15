import { Invoice, InvoiceStatus } from "@lbk/models";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {
  AuthActions,
  InvoiceActions,
  InvoicesAPIActions,
  InvoicesPreviewPageActions,
  ViewInvoicePageActions
} from "../../actions";

export const invoicesFeatureKey = "invoices";

export interface State extends EntityState<Invoice> {
  selectedInvoiceId: number | null;
  loadingInvoices: boolean;
}

export const adapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>({
  selectId: (invoice: Invoice) => invoice.id,
  sortComparer: (invoice1, invoice2) =>
    new Date(invoice1.createdAt).getTime() -
    new Date(invoice2.createdAt).getTime(),
});

export const initialState: State = adapter.getInitialState({
  selectedInvoiceId: null,
  filter: [],
  loadingInvoices: false,
});

export const reducer = createReducer(
  initialState,
  on(AuthActions.logout, (_) => initialState),
  on(InvoicesPreviewPageActions.enter, (state) => ({
    ...state,
    loadingInvoices: true,
  })),
  on(
    // BooksApiActions.searchSuccess,
    InvoicesAPIActions.loadInvoicesSuccess,
    (state, { invoices }) =>
      adapter.addMany(invoices, { ...state, loadingInvoices: false })
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
  on(InvoicesAPIActions.updateInvoiceSuccess, (state, { id, invoiceDto }) =>
    adapter.updateOne({ id, changes: { ...invoiceDto } }, state)
  ),
  on(ViewInvoicePageActions.selectInvoice, (state, { id }) => ({
    ...state,
    selectedInvoiceId: id,
  }))
);

export const selectId = (state: State) => state.selectedInvoiceId;
export const selectLoadingInvoices = (state: State) => state.loadingInvoices;
