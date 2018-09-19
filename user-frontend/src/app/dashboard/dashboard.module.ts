import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule
  ],
  declarations: [DashboardComponent, MainContentComponent, SideNavComponent, ToolbarComponent]
})
export class DashboardModule { }
