import { Component, OnInit} from '@angular/core';
import { AuthService } from '@core/services';
import { UserAuth } from '@user/models/user.auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  currentUser : UserAuth = null;
  
  constructor(
    private authService : AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    
  }

}
