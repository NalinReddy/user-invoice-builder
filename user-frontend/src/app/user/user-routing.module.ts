import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ResetComponent } from './components/reset/reset.component';
import { ResetFormComponent } from './components/reset-form/reset-form.component';

const routes: Routes = [
  {path: '', 
  component:AuthenticateComponent,
  children: [
    {path:'', redirectTo:'register', pathMatch:'full'},      
    {path:'register', component:SignupComponent },
    {path:'signin', component:SigninComponent },
    {path:'forgotpassword', component:ResetComponent},
    {path:'forgotpassword/:id/:token', component:ResetFormComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
