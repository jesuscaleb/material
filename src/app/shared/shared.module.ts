/**
 * Si se esta usando componentes globales personalizados:
 * Importar los componentes personalizados.
 *  import * as fromComponents from './components';
 * Declarar los componentes en la metadata de la clase NgModule
 *  declarations: [...fromComponents.components]
 * Exportarlos para acceder a ellos por toda la aplicación
 *  exports: [...fromComponents.components]
 **/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as sharedComponents from './components';
import * as sharedDirectives from './directives';
import * as sharedServices from './services';

// Material Modules
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';


// Third-party Modules
import { MomentModule } from "ngx-moment";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


const sharedModules: any[] = [
  // Material 
  MatSliderModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  // Third-Party 
  MomentModule,
  FormsModule,
  CommonModule
];

@NgModule({
  declarations: [sharedComponents.components, sharedDirectives.directives],
  imports: [sharedModules, RouterModule],
  exports: [sharedModules, sharedComponents.components, sharedDirectives.directives],
  providers : [sharedServices.services]
})
export class SharedModule {}
