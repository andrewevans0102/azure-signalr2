import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MessagesEffects } from "./messages.effects";
import * as fromMessages from "./messages.reducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromMessages.messagesFeatureKey,
      fromMessages.messagesReducer
    ),
    EffectsModule.forFeature([MessagesEffects]),
  ],
  declarations: [],
})
export class MessagesStateModule {}
