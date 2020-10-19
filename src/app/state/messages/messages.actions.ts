import { createAction, props } from "@ngrx/store";
import { Message } from "src/app/models/message";

export const messageSend = createAction(
  "[Messages] message send",
  props<{ message: Message }>()
);

export const messageSuccess = createAction("[Messages] message success");

export const loadMessages = createAction("[Messages] load messages");

export const clearMessages = createAction("[Messages] clear messages");

export const messageRecieved = createAction(
  "[Messages] message recieved",
  props<{ message: Message }>()
);

export const recievedSuccess = createAction(
  "[Messages] recieved success",
  props<{ messages: Message[] }>()
);

export const messagesError = createAction(
  "[Messages] messages error",
  props<{ message: string }>()
);
