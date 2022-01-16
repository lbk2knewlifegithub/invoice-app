import { AuthApiActions } from "@frontend/state/actions";
import { routerNavigatedAction } from "@ngrx/router-store";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from "@ngrx/store";
import { SignUpPageActions } from "./actions";

export const signUpPageFeatureKey = "signUpPage";

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
  on(SignUpPageActions.signUp, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(
    AuthApiActions.signUpSuccess,
    routerNavigatedAction,
    AuthApiActions.loginSuccess,
    (_) => ({
      error: null,
      pending: false,
    })
  ),
  on(AuthApiActions.signUpFailure, (_, { error }) => ({
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;

/**
 * Sign Up Page Selector
 */
export const selectSignUpPageState =
  createFeatureSelector<State>(signUpPageFeatureKey);
export const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  getError
);
export const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  getPending
);
