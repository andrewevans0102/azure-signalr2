import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import {
  loadMessages,
  messageRecieved,
  messageSend,
  messagesError,
  messageSuccess,
  recievedSuccess,
  clearMessages,
} from "./messages.actions";
import { SignalRService } from "src/app/services/signalr/signalr.service";

@Injectable()
export class MessagesEffects {
  messages = [];

  clearMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearMessages),
      switchMap((action) =>
        this.signalRService.clear().pipe(
          map(() => recievedSuccess({ messages: [] })),
          catchError((error) => of(messagesError(error)))
        )
      )
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(messageSend),
      switchMap((action) =>
        this.signalRService
          .send(`${action.message.sender}|${action.message.body}`)
          .pipe(
            map(() => messageSuccess()),
            catchError((error) => of(messagesError(error)))
          )
      )
    )
  );

  recieveMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(messageRecieved),
      map((action) => {
        const totalMessages = this.signalRService.receieve(action.message);
        return recievedSuccess({ messages: totalMessages });
      })
    )
  );

  loadMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      map((action) => {
        const totalMessages = this.signalRService.load();
        return recievedSuccess({ messages: totalMessages });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private signalRService: SignalRService
  ) {}
}
