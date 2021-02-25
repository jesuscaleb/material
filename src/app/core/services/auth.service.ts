import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserAuth } from '@user/models/user.auth';
import { UserPermissions } from '@user/models/user.permissions';
import { User } from '@user/models/user';
import { environment } from '@env';

import { LocalStorageService } from '@core/services/local-storage.service';
import { Router } from '@angular/router';

const apiUrl = environment.API_URL + '/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router : Router
  ) {
    this.authSubject = new BehaviorSubject<UserAuth>(
      this.localStorageService.get('currentUser')
    );
    this.currentUser = this.authSubject.asObservable();
  }

  get currentUserValue(): UserAuth {
    return this.authSubject.value;
  }

  get isAuthenticated(): boolean {
    let user = this.localStorageService.get('currentUser');
    if (user) {
      if (user.token){
        return true;
      }
    }else{
      return false;
    } 
  }

  login(entity: User): Observable<UserAuth> {
    // Initialize security object
    this.resetCurrentUser();

    return this.http
      .post<UserAuth>(apiUrl + '/login', entity, httpOptions)
      .pipe(
        tap((user) => {
          // Store into local storage
          this.localStorageService.set('currentUser', {
            token: user.accessToken,
            username: user.username,
            publicKey: user.publicKey 
          });

          this.localStorageService.setEncrypted(
            'payload',
            { permissions: user.permissions},
            user.publicKey
          );
          this.authSubject.next(user);
        })
      );
  }

  logout(): void {
    this.resetCurrentUser();
    this.router.navigate(['/']);
  }

  resetCurrentUser(): void {
    this.authSubject.next(null);
    this.localStorageService.remove('currentUser');
    this.localStorageService.remove('payload');
  }

  // This method can be called a couple of different ways
  // *hasPermission="'permissionType'"  // Assumes permissionValue is true
  // *hasPermission="'permissionType:value'" // Compares permissionValue to value
  // *hasPermission="['permissionType1','permissionType2:value','permissionType3']"
  hasPermission(permissionType: any): boolean {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof permissionType === 'string') {  
      ret = this.isPermissionValid(permissionType);
    } else {
      let permissions: string[] = permissionType;
      if (permissions) {
        for (let index = 0; index < permissions.length; index++) {
          ret = this.isPermissionValid(permissions[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }
    
    return ret;
  }

  private isPermissionValid(permissionType: string): boolean {
    let ret: boolean = false;
    let permissionValue: boolean = false;

    let key = this.currentUserValue.publicKey;
    let auth = this.localStorageService.getEncrypted('payload', key);
     
    // Retrieve security object
    if (auth) {
      // See if the permission type has a value
      // *hasPermission="'permissionType:value'"
      if (permissionType.indexOf(':') >= 0) {
        let words: string[] = permissionType.split(':');
        permissionType = words[0].toLowerCase();
        permissionValue = (words[1] === 'true'); 
      } else {
        permissionType = permissionType.toLowerCase();
        // Either get the claim value, or assume 'true'
        permissionValue = permissionValue ? permissionValue : true;
      }
      // Attempt to find the claim
      ret =
        auth.permissions.find(
          (p : UserPermissions) =>  
          p.type.toLowerCase() === permissionType && p.value === permissionValue
        ) != null;
    }

    return ret;
  }
}
