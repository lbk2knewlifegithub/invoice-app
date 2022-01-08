import { createReducer, on } from '@ngrx/store';
import { LayoutActions } from '../../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  showEditOverlay: boolean;
  showNewInvoiceOverlay: boolean;
}

export const initialState: State = {
  showEditOverlay: false,
  showNewInvoiceOverlay: false,
};

export const reducer = createReducer(
  initialState,
  // Edit Invoice overlay
  on(LayoutActions.showEditOverlay, (_) => ({
    showNewInvoiceOverlay: false,
    showEditOverlay: true,
  })),
  on(LayoutActions.closeEditOverlay, (_) => ({
    showNewInvoiceOverlay: false,
    showEditOverlay: false,
  })),
  // New Invoice overlay
  on(LayoutActions.showNewInvoiceOverlay, (_) => ({
    showNewInvoiceOverlay: true,
    showEditOverlay: false,
  })),
  on(LayoutActions.closeNewInvoiceOverlay, (_) => ({
    showNewInvoiceOverlay: false,
    showEditOverlay: false,
  }))
);

export const getShowEditOverlay = (state: State) => state.showEditOverlay;
export const getShowNewInvoiceOverlay = (state: State) =>
  state.showNewInvoiceOverlay;
