import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoginEffects } from "./login.effects";
import * as fromLogin from "./login.reducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [],
})
export class LoginStateModule {}
