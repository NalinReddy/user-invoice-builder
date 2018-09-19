import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',
 loadChildren:'app/user/user.module#UserModule'
},
  {path:'dashboard',
     loadChildren:'app/dashboard/dashboard.module#DashboardModule'   
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }