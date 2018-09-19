import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './components/reset/reset.component';
import { ResetFormComponent } from './components/reset-form/reset-form.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [SignupComponent, SigninComponent, AuthenticateComponent, ResetComponent, ResetFormComponent],
  exports: [SignupComponent, SigninComponent, AuthenticateComponent],
})
export class UserModule { }
