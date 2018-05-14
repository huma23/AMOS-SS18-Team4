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

  constructor( private loginService: PlLoginService, private router:Router)
  {
    this.emailFormControl     = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl  = new FormControl('', [Validators.required,]);
    this.formContent          = new LoginForm("","");
    this.loginTrys            = 0;
  }

  ngOnInit() { }

  onSubmit(form:LoginForm)
  {

    // Wenn User bereits eingeloggt, weiterleiten auf app. 
    // Möglicherweise unnötig.
    if (this.loginService.isLoggedIn())
      this.router.navigateByUrl("/app");

  // Aufruf des LoginServices zum Einloggen, liefert das Ergebnis inform eines Observables
  // Abbonnieren darauf und Ergebniss verarbeiten. 

    this.loginService.login(form).subscribe(
      (token:Token) =>
      {
        // Happy Path. Einloggen hat funktioniert. Token speichern und weiter zu App.
        console.log("Token received \n " + token.token + "\n"+token.timestampt);
        this.loginService.setToken(token);
        this.loginService.setLogin(true);        
        this.router.navigateByUrl("/app");

      },
      (error: Error) => 
      {
        // Error Path. Logging Ausgabe sowie User via FensterError mitteilen dass Login 
        // schiefgelaufen ist.
        console.log("Error on Requestesting /api/login with Credentials \n User: " +form.email 
          +"; . ");
        console.log(error.message);

        window.alert("Fehlerhafte Eingabe");
        this.loginTrys++;
        this.errorOnSubmit = true;
        this.errorMessage = 
          "Login gescheitert. Bitte erneut versuchen. Gescheiterte Versuche : " 
            + this.loginTrys ;
        
        this.clearLoginForm();

      });
  }

  /**
   * @method 
   * getEmailErrorMessage
   * 
   * @param 
   * none
   * 
   * @return 
   * none
   *  
   * @description
   * 
   * Methode leert die Eingabefelder des Logins nach gescheitertem Einloggversuch.
   * 
   */
  getEmailErrorMessage()
  {
    return this.emailFormControl.hasError('required')? 'Keine E-Mail Adresse eingegeben':
      this.emailFormControl.hasError('email') ? 'Keine valide E-Mail Adresse' : '';
  }
  /**
   * @method 
   * getPasswordErrorMessage
   * 
   * @param 
   * none
   * 
   * @return 
   * none
   *  
   * @description
   * 
   * Methode leert die Eingabefelder des Logins nach gescheitertem Einloggversuch.
   * 
   */


  getPasswordErrorMessage()
  {
    return this.passwordFormControl.hasError('required')? 'Kein Passwort eingegeben': '';
  }
  
   /**
   * @method 
   * clearLoginForm
   * 
   * @param 
   * none
   * 
   * @return 
   * none
   *  
   * @description
   * 
   * Methode leert die Eingabefelder des Logins nach gescheitertem Einloggversuch.
   * 
   */

  clearLoginForm()
  {
    this.emailFormControl.setValue("");
    this.passwordFormControl.setValue("");
  }
}
