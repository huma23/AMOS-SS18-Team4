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
      var success = this.loginService.login(form);  
      
      if (success)
      {
        //Umleiten zu App. Token mittlerweile gesetzt
        this.router.navigateByUrl("/app");
      }
      else
      {
        //Fehler aufgetreten

        this.loginTrys++;
        this.errorOnSubmit = true;
        this.errorMessage = 
          "Login gescheitert. Bitte erneut versuchen. Gescheiterte Versuche : " 
            + this.loginTrys ;
        
        this.clearContent();
        
      }
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
