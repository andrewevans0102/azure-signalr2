import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { LoginActions } from "../state/login";
import { Subject } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  name: string;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private router: Router, private store: Store<{}>) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(LoginActions.loadLogin({ name: this.name }));
    this.router.navigateByUrl("/home");
  }
}
