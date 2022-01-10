import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromLoginPage from "../reducers/login-page.reducer";
/**
 * Login Page Selector
 */
export const selectLoginPageState = createFeatureSelector<fromLoginPage.State>(
  fromLoginPage.loginPageFeatureKey
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
