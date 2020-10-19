import { loginError, loadLogin } from "./login.actions";

import { on, createReducer, Action } from "@ngrx/store";

export interface State {
  name: "";
  error: string;
}

export const initialState: State = {
  name: "",
  error: "",
};

export const loginReducer = createReducer(
  initialState,
  on(loadLogin, (state, action) => ({
    ...state,
    name: action.name,
  })),
  on(loginError, (state, action) => ({
    ...state,
    error: action.message,
  }))
);

export const loginFeatureKey = "login";

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
