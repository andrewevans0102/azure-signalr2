import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromLogin from "./login.reducer";

const getLoginState = createFeatureSelector<fromLogin.State>(
  fromLogin.loginFeatureKey
);

export const selectName = createSelector(getLoginState, (state) => state.name);

export const selectError = createSelector(
  getLoginState,
  (state) => state.error
);
