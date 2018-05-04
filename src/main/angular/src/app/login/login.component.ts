import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LoginForm} from "../../model/loginForm";
import {PlLoginService} from "./login.service";

@Component({
  selector: 'pl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {'class': 'pl-flex'}
})

export class LoginComponent implements OnInit {

  public emailFormControl;
  public passwordFormControl;
  public formContent;

  constructor(private loginService: PlLoginService) {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl('', [Validators.required,]);
    this.formContent = new LoginForm("","");
  }

  ngOnInit()
  {

  }

  onSubmit(form: LoginForm){

  }

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')? 'Keine E-Mail Adresse eingegeben':
      this.emailFormControl.hasError('email') ? 'Keine valide E-Mail Adresse':
        '';
  }

  getPasswordErrorMessage(){
    return this.passwordFormControl.hasError('required')? 'Kein Passwort eingegeben':
        '';
  }
}
