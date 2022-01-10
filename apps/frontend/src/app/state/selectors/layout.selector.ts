import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromLayout from "../reducers/layout";
/**
 * Layout selector
 */
export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShowEditOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowEditOverlay
);

export const selectShowNewInvoiceOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowNewInvoiceOverlay
);

export const selectShowOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowOverlay
);

export const selectDarkThem = createSelector(
  selectLayoutState,
  fromLayout.getDarkTheme
);
