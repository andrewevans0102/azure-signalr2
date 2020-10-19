import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
import { Observable, of } from "rxjs";
import { SignalRConnectionInfo } from "./signalr-connection-info.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Message } from "src/app/models/message";
import { environment } from "src/environments/environment";

@Injectable()
export class SignalRService {
  private readonly _http: HttpClient;
  // private readonly _baseUrl: string = "http://localhost:7071/api/";
  private readonly _baseUrl: string = environment.azureConnection;
  private hubConnection: HubConnection;
  messages: Subject<string> = new Subject();

  constructor(http: HttpClient) {
    this._http = http;
  }

  private getConnectionInfo(): Observable<SignalRConnectionInfo> {
    let requestUrl = `${this._baseUrl}negotiate`;
    return this._http.get<SignalRConnectionInfo>(requestUrl);
  }

  init() {
    this.getConnectionInfo().subscribe((info) => {
      let options = {
        accessTokenFactory: () => info.accessToken,
      };

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.hubConnection.start().catch((err) => console.error(err.toString()));

      this.hubConnection.on("notify", (data: any) => {
        this.messages.next(data);
      });
    });
  }

  send(message: string): Observable<void> {
    console.log("called2");
    let requestUrl = `${this._baseUrl}messages`;
    return this._http.post(requestUrl, message).pipe(map((result: any) => {}));
  }

  receieve(message: Message): Message[] {
    // read in from local strorage
    const messages = this.load();
    messages.unshift(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    return messages;
  }

  load(): Message[] {
    const messagesLocal = localStorage.getItem("messages");
    let messagesResponse = [];
    if (messagesLocal !== null) {
      messagesResponse = JSON.parse(messagesLocal);
    }
    return messagesResponse;
  }

  clear(): Observable<void> {
    const messagesLocal = localStorage.getItem("messages");
    let messagesResponse = [];
    if (messagesLocal !== null) {
      localStorage.setItem("messages", JSON.stringify(messagesResponse));
    }
    return of(null);
  }
}
