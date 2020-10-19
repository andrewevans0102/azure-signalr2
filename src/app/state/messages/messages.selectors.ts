import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromMessages from "./messages.reducer";

const getMessagesState = createFeatureSelector<fromMessages.State>(
  fromMessages.messagesFeatureKey
);

export const selectMessages = createSelector(
  getMessagesState,
  (state) => state.messages
);

export const selectError = createSelector(
  getMessagesState,
  (state) => state.error
);
