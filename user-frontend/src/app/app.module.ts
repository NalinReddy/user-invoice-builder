import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './shared/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ],
  bootstrap: [AppComponent],
  providers:[AuthService, AuthGuardService]
})
export class AppModule { }
