import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';

import * as articleComponents from './components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [articleComponents.components],
  imports: [
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
