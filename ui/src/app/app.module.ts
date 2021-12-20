import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PrimeNGConfig, SharedModule} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {atlantisReducer} from "./app.reducer";
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    InputTextModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MenubarModule,
    MenuModule,
    StoreModule.forRoot({
      atlantis: atlantisReducer
    }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
