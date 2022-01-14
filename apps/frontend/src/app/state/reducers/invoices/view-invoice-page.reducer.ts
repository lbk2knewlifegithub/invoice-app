import {
  InvoicesAPIActions,
  ViewInvoicePageActions
} from "@frontend/state/actions";
import { createReducer, on } from "@ngrx/store";

export const viewInvoicePageFeatureKey = "viewInvoicePage";

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(ViewInvoicePageActions.maskAsPaid, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(InvoicesAPIActions.maskAsPaidSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(InvoicesAPIActions.maskAsPaidFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
