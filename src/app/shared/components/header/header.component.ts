import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { DialogData } from '@shared/models/dialog';
import { DialogService } from '@shared/services';
import { UserAuth } from '@user/models/user.auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  
  @Input() isLoginPage : boolean;
  public currentUser : UserAuth;
  private dialogOptions : DialogData;

  constructor(
    private authService :AuthService,
    private dialogService : DialogService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  logoutHandler() : void{
    this.dialogOptions = {
      title: 'Estás seguro?',
      message: '',
      cancelText: 'Cancelar',
      confirmText: 'Cerrar sesión'
    }

    this.dialogService.open(this.dialogOptions);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.logout();
      }
    });
  }
  
  logout() : void{
    this.authService.logout();
  }

}
