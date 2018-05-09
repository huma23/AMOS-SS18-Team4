/**
 *  @license
 *
 *
 * Copyright [2018] [(MAMB Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)]

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright (c) 2018 by MAMB (Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 *
 *
 */

import { Component, OnInit }      from '@angular/core';
import { FormControl, Validators }from "@angular/forms";
import { LoginForm }              from "../../model/loginForm";
import { PlLoginService }         from "./login.service";
import { Router }                 from '@angular/router';
import { Token}                   from '../../model/token';
import { AuthService } from '../services/auth.service';


/**
 * 
 * @class LoginComponent
 * 
 * 
 * 
 *  
 * 
 * 
 */

@Component({
  selector:     'pl-login',
  templateUrl:  './login.component.html',
  styleUrls:    ['./login.component.css'],
  host: {'class': 'pl-flex'}
})

export class LoginComponent implements OnInit
{

  public emailFormControl;
  public passwordFormControl;
  public formContent;
  public errorMessage   : string;
  public errorOnSubmit  : boolean;
  public loginTrys      : number;

  constructor( private loginService: PlLoginService, private router:Router, private authService : AuthService)
  {
    this.emailFormControl     = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl  = new FormControl('', [Validators.required,]);
    this.formContent          = new LoginForm("","");
    this.loginTrys            = 0;
  }

  ngOnInit() { }

  onSubmit(form:LoginForm)
  {
      this.loginService.login(form).subscribe
      (
          (token :Token) => 
          {
            // Anfrage war erfolgreich, token speichern
            //this.loggedIn = true;
            //this._authService.setToken(token);
        //    return true;
        console.log("Received Token");
        console.log ("token");
        this.authService.setToken(token);
        this.router.navigateByUrl("/app");
        
  
         },
          error =>
          {
            // Fehler beim Einloggen aufgetreten, der Grund ist aktuell nicht von Bedeutung
            window.alert("Fehlerhafte Eingabe");
            this.loginTrys++;
            this.errorOnSubmit = true;
            this.errorMessage = 
              "Login gescheitert. Bitte erneut versuchen. Gescheiterte Versuche : " 
                + this.loginTrys ;
            
            this.clearContent();
           
          }
        );
  }

  getEmailErrorMessage()
  {
    return this.emailFormControl.hasError('required')? 'Keine E-Mail Adresse eingegeben':
      this.emailFormControl.hasError('email') ? 'Keine valide E-Mail Adresse' : '';
  }

  getPasswordErrorMessage()
  {
    return this.passwordFormControl.hasError('required')? 'Kein Passwort eingegeben': '';
  }

  clearContent()
  {
    this.emailFormControl.setValue("");
    this.passwordFormControl.setValue("");
  }
}
