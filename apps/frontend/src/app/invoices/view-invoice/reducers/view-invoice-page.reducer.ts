import { InvoicesAPIActions } from "@frontend/state/actions";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from "@ngrx/store";
import { ViewInvoicePageActions } from "../actions";

export const viewInvoicePageFeatureKey = "viewInvoicePage";

export interface State {
  error: string | null;
  pendingMaskAsPaid: boolean;
  pendingSaveAndChange: boolean;
  pendingDelete: boolean;
}

export const initialState: State = {
  error: null,
  pendingMaskAsPaid: false,
  pendingSaveAndChange: false,
  pendingDelete: false,
};

export const reducer = createReducer(
  initialState,
  on(ViewInvoicePageActions.maskAsPaid, (_) => ({
    error: null,
    pendingDelete: false,
    pendingSaveAndChange: false,
    pendingMaskAsPaid: true,
  })),
  on(ViewInvoicePageActions.updateInvoice, (_) => ({
    error: null,
    pendingDelete: false,
    pendingMaskAsPaid: false,
    pendingSaveAndChange: true,
  })),
  on(ViewInvoicePageActions.deleteInvoice, (_) => ({
    error: null,
    pendingDelete: true,
    pendingMaskAsPaid: false,
    pendingSaveAndChange: false,
  })),

  on(
    InvoicesAPIActions.maskAsPaidSuccess,
    InvoicesAPIActions.editInvoiceSuccess,
    InvoicesAPIActions.deleteInvoiceSuccess,
    (_) => ({
      error: null,
      pendingMaskAsPaid: false,
      pendingSaveAndChange: false,
      pendingDelete: false,
    })
  ),
  on(
    InvoicesAPIActions.maskAsPaidFailure,
    InvoicesAPIActions.editInvoiceFailure,
    InvoicesAPIActions.deleteInvoiceFailure,
    (_, { error }) => ({
      error,
      pendingMaskAsPaid: false,
      pendingSaveAndChange: false,
      pendingDelete: false,
    })
  )
);

export const getError = (state: State) => state.error;
export const getPendingMaskAsPaid = (state: State) => state.pendingMaskAsPaid;

export const getPendingSaveAndChange = (state: State) =>
  state.pendingSaveAndChange;

export const getPendingDelete = (state: State) => state.pendingDelete;

/**
 * Selector
 */
export const selectViewInvoicePageState = createFeatureSelector<State>(
  viewInvoicePageFeatureKey
);
export const selectError = createSelector(selectViewInvoicePageState, getError);

export const selectPendingMaskAsPaid = createSelector(
  selectViewInvoicePageState,
  getPendingMaskAsPaid
);

export const selectPendingSaveAndChange = createSelector(
  selectViewInvoicePageState,
  getPendingSaveAndChange
);

export const selectPendingDelete = createSelector(
  selectViewInvoicePageState,
  getPendingDelete
);
