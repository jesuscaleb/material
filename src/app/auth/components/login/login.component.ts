import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';

import { User } from "@user/models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public error : boolean = false;
  public $user : User = new User();
  public hidePassword : boolean = true;
  returnUrl : string;

  constructor(
    private authService : AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  login() {
    this.authService.login(this.$user)
      .subscribe(
        () => {
        this.router.navigateByUrl(this.returnUrl);
        },
        (err)=>{
          this.error = true;
        }

      );
  }

  logout(){
    this.authService.logout();
  }

}
