import { Component } from '@angular/core';
import { AuthService } from '@core/services';
import { UserAuth } from '@user/models/user.auth';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.sass']
})
export class SingleComponent  {
  public currentUser : UserAuth;
  
  constructor(
    private authService : AuthService
  ) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

}
