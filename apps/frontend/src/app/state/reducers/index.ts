import { InjectionToken } from "@angular/core";
import * as fromRouter from "@ngrx/router-store";
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from "@ngrx/store";
import { environment } from "apps/frontend/src/environments/environment";
import * as fromAuth from "./auth/auth.reducer";
import * as fromLoginPage from "./auth/login-page.reducer";
import * as fromSignUpPage from "./auth/sign-up-page.reducer";
import * as fromInvoices from "./invoices";
import * as fromLayout from "./layout";
import * as fromSearch from "./search.reducer";

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  [fromInvoices.invoicesFeatureKey]: fromInvoices.State;
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
  [fromSignUpPage.signUpPageFeatureKey]: fromSignUpPage.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>("Root reducers token", {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    [fromInvoices.invoicesFeatureKey]: fromInvoices.reducer,
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
    [fromSignUpPage.signUpPageFeatureKey]: fromSignUpPage.reducer,
    router: fromRouter.routerReducer,
  }),
});

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
