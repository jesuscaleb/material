import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@core/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService : LocalStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.localStorageService.get("currentUser");
    let token = user.accessToken;

    if(token) {
      const newReq = req.clone(
        { 
          headers: req.headers.set('Authorization',
                    'Bearer ' + token)
        });

        return next.handle(newReq);
    }
    else {
      return next.handle(req);
    }
  }
}