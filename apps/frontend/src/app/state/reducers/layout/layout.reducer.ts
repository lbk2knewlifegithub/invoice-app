import { createReducer, on } from "@ngrx/store";
import { LayoutActions } from "../../actions";

export const layoutFeatureKey = "layout";

export interface State {
  showEditOverlay: boolean;
  showNewInvoiceOverlay: boolean;
  darkTheme: boolean;
}

export const initialState: State = {
  showEditOverlay: true,
  showNewInvoiceOverlay: true,
  darkTheme: false,
};

export const reducer = createReducer(
  initialState,
  // Edit Invoice overlay
  on(LayoutActions.showEditOverlay, (state) => ({
    ...state,
    showNewInvoiceOverlay: false,
    showEditOverlay: true,
  })),
  // New Invoice overlay
  on(LayoutActions.showNewInvoiceOverlay, (state) => ({
    ...state,
    showNewInvoiceOverlay: true,
    showEditOverlay: false,
  })),
  on(LayoutActions.closeAllOverlay, (state) => ({
    ...state,
    showNewInvoiceOverlay: false,
    showEditOverlay: false,
  })),
  on(LayoutActions.toLightTheme, (state) => ({
    ...state,
    darkTheme: false,
  })),
  on(LayoutActions.toDarkTheme, (state) => ({
    ...state,
    darkTheme: true,
  }))
);

export const getShowEditOverlay = (state: State) => state.showEditOverlay;

export const getShowNewInvoiceOverlay = (state: State) =>
  state.showNewInvoiceOverlay;

export const getShowOverlay = (state: State) =>
  state.showNewInvoiceOverlay || state.showEditOverlay;

export const getDarkTheme = (state: State) => state.darkTheme;
