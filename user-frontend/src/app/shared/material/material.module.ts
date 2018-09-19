import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';


const exportedModules = [
  MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
]
@NgModule({
  imports: [
    CommonModule,
    ...exportedModules
  ],
  exports: [
   ...exportedModules
  ],
  declarations: []
})
export class MaterialModule { }
