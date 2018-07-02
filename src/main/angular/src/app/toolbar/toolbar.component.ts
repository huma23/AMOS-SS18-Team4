import {Component, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {PlToolbarSharedService} from "./toolbar-shared.service";

@Component({
  selector: 'pl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class PlToolbarComponent
{
  title = 'Planungstafel';
  loggedIn = false;

  constructor(private authService: AuthService,
              private router:Router,
              public shared:PlToolbarSharedService){
    this.loggedIn = authService.hasValidToken();
  }

  callLogout(){
    this.authService.removeToken();
    this.router.navigateByUrl("/login");
    this.loggedIn = false;
  }

  showLeft(bool : boolean){
    this.shared.showLeft = bool;
  }

  showRight(bool : boolean){
    this.shared.showRight = bool;
  }
}
