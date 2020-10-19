import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { Message } from "../models/message";
import { SignalRService } from "../services/signalr/signalr.service";
import { selectError, selectName } from "../state/login";
import { MessagesActions, selectMessages } from "../state/messages";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  messages$: Observable<any>;
  loginError$: Observable<any>;
  messagesError$: Observable<any>;
  unsubscribe$: Subject<void> = new Subject();
  name!: string;
  icon: string;
  loginProfile: any;
  messages = [];
  messageInput: string;

  constructor(
    private router: Router,
    private signalRService: SignalRService,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectName)).subscribe((name) => {
      this.name = name;
    });
    this.messages$ = this.store.pipe(select(selectMessages));
    this.loginError$ = this.store.pipe(select(selectError));
    this.store.dispatch(MessagesActions.loadMessages());
    // start the service to connect to azure signalR
    this.signalRService.init();
    this.signalRService.messages.subscribe((message) => {
      // create message
      const result = message.split("|");
      const sendMessage = new Message();
      sendMessage.sender = result[0];
      sendMessage.body = result[1];
      // this.messages.unshift(sendMessage);
      this.store.dispatch(
        MessagesActions.messageRecieved({ message: sendMessage })
      );
    });
  }

  logout() {
    this.router.navigateByUrl("/login");
  }

  send() {
    let sendMessage = new Message();
    sendMessage.body = this.messageInput;
    sendMessage.sender = this.name;
    this.store.dispatch(MessagesActions.messageSend({ message: sendMessage }));
  }

  clear() {
    this.store.dispatch(MessagesActions.clearMessages());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
