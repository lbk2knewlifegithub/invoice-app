import {
  AuthActions,
  AuthApiActions,
  InvoicesAPIActions,
  InvoicesPreviewPageActions
} from "@frontend/state/actions";
import { InvoiceStatus } from "@lbk/models";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from "@ngrx/store";

export const invoicesPreviewPage = "newInvoice";

export interface State {
  error: string | null;
  pendingSaveAsDraft: boolean;
  pendingCreate: boolean;
  loadingInvoices: boolean;
  loaded: boolean;
}

export const initialState: State = {
  error: null,
  pendingSaveAsDraft: false,
  pendingCreate: false,
  loadingInvoices: false,
  loaded: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.logout, (_) => initialState),
  on(InvoicesPreviewPageActions.createInvoice, (state, { invoiceDto }) => ({
    ...state,
    error: null,
    pendingCreate: invoiceDto.status === InvoiceStatus.PENDING,
    pendingSaveAsDraft: invoiceDto.status === InvoiceStatus.DRAFT,
  })),
  on(InvoicesAPIActions.createInvoiceSuccess, (_) => initialState),
  on(InvoicesAPIActions.createInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
    pendingCreate: false,
    pendingSaveAsDraft: false,
  })),

  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    loadingInvoices: true,
    loaded: false,
  })),
  on(InvoicesAPIActions.loadInvoicesSuccess, (state) => ({
    ...state,
    loadingInvoices: false,
    loaded: true,
  }))
);

export const getError = (state: State) => state.error;
export const getPendingSaveDraft = (state: State) => state.pendingSaveAsDraft;
export const getPendingCreate = (state: State) => state.pendingCreate;
export const getLoadingInvoices = (state: State) => state.loadingInvoices;
export const getLoaded = (state: State) => state.loaded;

/**
 * New Invoice Selector
 */
export const selectInvoicesPreviewPageState =
  createFeatureSelector<State>(invoicesPreviewPage);

export const selectNewInvoiceError = createSelector(
  selectInvoicesPreviewPageState,
  getError
);

export const selectPendingSaveAsDraft = createSelector(
  selectInvoicesPreviewPageState,
  getPendingSaveDraft
);

export const selectPendingCreate = createSelector(
  selectInvoicesPreviewPageState,
  getPendingCreate
);

export const selectLoadingInvoices = createSelector(
  selectInvoicesPreviewPageState,
  getLoadingInvoices
);

export const selectLoaded = createSelector(
  selectInvoicesPreviewPageState,
  getLoaded
);
