import {
  InvoicesAPIActions,
  InvoicesPreviewPageActions
} from "@frontend/state/actions";
import { InvoiceStatus } from "@lbk/models";
import { createReducer, on } from "@ngrx/store";

export const newInvoiceFeatureKey = "newInvoice";

export interface State {
  error: string | null;
  pendingSaveAsDraft: boolean;
  pendingCreate: boolean;
}

export const initialState: State = {
  error: null,
  pendingSaveAsDraft: false,
  pendingCreate: false,
};

export const reducer = createReducer(
  initialState,
  on(InvoicesPreviewPageActions.createInvoice, (state, { invoiceDto }) => ({
    ...state,
    error: null,
    pendingCreate: invoiceDto.status === InvoiceStatus.PENDING,
    pendingSaveAsDraft: invoiceDto.status === InvoiceStatus.DRAFT,
  })),
  on(InvoicesAPIActions.createInvoiceSuccess, (_) => initialState),
  on(InvoicesAPIActions.createInvoiceFailure, (_, { error }) => ({
    error,
    pendingCreate: false,
    pendingSaveAsDraft: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPendingSaveDraft = (state: State) => state.pendingSaveAsDraft;
export const getPendingCreate = (state: State) => state.pendingCreate;
