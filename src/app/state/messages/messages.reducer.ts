import { messagesError, recievedSuccess } from "./messages.actions";

import { on, createReducer, Action } from "@ngrx/store";

export interface State {
  messages: [];
  error: string;
}

export const initialState: State = {
  messages: [],
  error: "",
};

export const messagesReducer = createReducer(
  initialState,
  on(recievedSuccess, (state, action) => ({
    ...state,
    messages: action.messages,
  })),
  on(messagesError, (state, action) => ({
    ...state,
    error: action.message,
  }))
);

export const messagesFeatureKey = "messages";

export function reducer(state: State | undefined, action: Action) {
  return messagesReducer(state, action);
}
