import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  UrlTree
} from '@angular/router';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let permissionType: string = next.data["permissionType"];
          
      if (this.authService.isAuthenticated
        && this.authService.hasPermission(permissionType)) {
        return true;
      }
      else {
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
  }
  
}
