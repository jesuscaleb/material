import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as authInterceptors from './interceptors';
import * as authComponents from "./components";
import * as authGuards from "./guards";

@NgModule({
  declarations: [authComponents.components],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers : [
    authGuards.guards,
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptors.AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptors.AuthErrorInterceptor, multi: true }
  ]
})
export class AuthModule { }
