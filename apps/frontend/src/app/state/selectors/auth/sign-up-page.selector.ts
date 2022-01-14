import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromSignUpPage from "../../reducers/auth/sign-up-page.reducer";

/**
 * Sign Up Page Selector
 */
export const selectSignUpPageState =
  createFeatureSelector<fromSignUpPage.State>(
    fromSignUpPage.signUpPageFeatureKey
  );
export const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  fromSignUpPage.getError
);
export const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  fromSignUpPage.getPending
);
