import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { TemplateRoutingModule } from './template-routing.module';

import * as templateComponents from './components';


@NgModule({
  declarations: [templateComponents.components],
  imports: [
    SharedModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
