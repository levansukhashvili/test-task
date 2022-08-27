import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ClientsEffects } from "../core/store/effects/clients.effects";
import * as fromApp from '../core/store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientFormModule } from "./client-form/client-form.module";
import { CreatedClientComponent } from './created-client/created-client.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatedClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ClientsEffects]),
    BrowserAnimationsModule,
    ClientFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
