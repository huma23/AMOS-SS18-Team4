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


import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { AuthService }              from '../services/auth.service';
import { LoginForm }                from '../../model/loginForm';
import { Md5 }                      from  'ts-md5/dist/md5';
import { Token }                    from '../../model/token';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlLoginService
{

  private httpClient : HttpClient;
  private authService : AuthService;
  private loggedIn   : boolean;

  constructor(_httpClient:HttpClient, _authService : AuthService )
  {
    this.authService  = _authService;
    this.httpClient   = _httpClient;
    this.loggedIn     = false;
  }


  login (form: LoginForm)
  {
    //simple hash
    console.log("USerPasswort = " +form.password);

    let body : string = JSON.stringify(form);
    console.log("Stringified" + body);

    /*this.httpClient.post('/api/login', body, httpOptions)
    .subscribe
    (
        (token :Token) =>
        {
          // Anfrage war erfolgreich, token speichern
          this.loggedIn = true;
          this._authService.setToken(token);
          return true;

        },
        error =>
        {
          // Fehler beim Einloggen aufgetreten, der Grund ist aktuell nicht von Bedeutung
          console.log(error);
          return false;
        }
      )
      ;*/
      return this.httpClient.post('/api/login',body,httpOptions);
  }
// Ausloggen des Users.
  logout()
  {
    if (this.authService.removeToken())
      this.loggedIn = false;
  }
// User Logout
  isLoggedIn() : boolean
  {
    return this.loggedIn;
  }
}
