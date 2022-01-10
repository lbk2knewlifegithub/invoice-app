import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "../reducers/auth.reducer";

/**
 * Auth selector
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.statusFeatureKey
);

export const selectUser = createSelector(selectAuthState, fromAuth.getUser);

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);
