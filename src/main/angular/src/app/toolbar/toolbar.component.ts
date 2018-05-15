import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class PlToolbarComponent
{
  title = 'Planungstafel';
  loggedIn = false;

  constructor(private authService: AuthService, private router:Router){
    this.loggedIn = authService.hasValidToken();
  }

  callLogout(){
    this.authService.removeToken();
    this.router.navigateByUrl("/login");
    this.loggedIn = false;
  }
}
