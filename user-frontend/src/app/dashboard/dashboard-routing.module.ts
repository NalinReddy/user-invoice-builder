import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { AuthGuardService } from '../shared/auth-guard.service';

const routes: Routes = [
  {path: '', 
  component:DashboardComponent, canActivate:[AuthGuardService],
  children: [
    {path:'invoices', component:InvoiceListingComponent,canActivate:[AuthGuardService]},
    {path:'invoice/new', component:InvoiceFormComponent,canActivate:[AuthGuardService]},
    {path:'invoice/:id', component:InvoiceFormComponent,canActivate:[AuthGuardService]},
    {path:'**', redirectTo:'invoices'},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
