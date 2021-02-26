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
const exp = environment.TOKEN_EXPIRE_TIME;

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

  private tokenExpirationTime(): string {
    let today = new Date();
    today.setSeconds( exp );
    return today.getTime().toString();
  }

  get isAuthenticated(): boolean {
    const date = new Date();
    const user = this.localStorageService.get('currentUser');
    if (!user) { return false; }
    const payload = this.localStorageService.getEncrypted('payload', user.publicKey);
    if (!payload) { return false; } 
    let expires = Number(payload.exp);
    date.setTime(expires); 

    // Comparing expire date with actual date
    if (date > new Date()) {
      return true;
    } else {
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
          this.saveToken(user);
          this.authSubject.next(user);
        })
      );
  }

  private saveToken(data : UserAuth) : void {
    this.localStorageService.set('currentUser', {
      token: data.accessToken,
      username: data.username,
      publicKey: data.publicKey 
    });

    this.localStorageService.setEncrypted(
      'payload',
      { 
        permissions: data.permissions,
        exp : this.tokenExpirationTime()
      },
      data.publicKey
    );   
  }

  logout(): void {
    this.resetCurrentUser();
    this.router.navigate(['/']);
  }

  private resetCurrentUser(): void {
    this.authSubject.next(null);
    this.localStorageService.remove('currentUser');
    this.localStorageService.remove('payload');
    this.localStorageService.remove('exp');
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
