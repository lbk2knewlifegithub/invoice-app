import { AuthApiActions } from "@frontend/state/actions";
import { routerNavigatedAction } from "@ngrx/router-store";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from "@ngrx/store";
import { LoginPageActions } from "./actions";

export const loginPageFeatureKey = "loginPage";

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: "",
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    error: null,
    pending: true,
  })),

  on(
    AuthApiActions.loginSuccess,
    routerNavigatedAction,
    AuthApiActions.signUpSuccess,
    (_) => ({
      error: null,
      pending: false,
    })
  ),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;

/**
 * Login Page Selector
 */
export const selectLoginPageState =
  createFeatureSelector<State>(loginPageFeatureKey);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  getPending
);
