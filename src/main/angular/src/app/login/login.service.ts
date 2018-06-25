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
import { Observable }               from 'rxjs/Observable';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


 /**
 * 
 * @class LoginService
 * 
 * 
 * Der LoginService ist beschreibt die Serviceroutine, die beim Ausfüllen und absenden
 * des Login Formulars zur Anmeldung in Planungstafel den Call auf die Api ausführt und den 
 * User verifiziert. 
 * Nach dem erfolgreichen Einloggen wird der erhaltene Token mitHilfe des AuthService gespeichert 
 * und der User wird umgeleitet auf den Inhalt von Planungstafel. 
 * @see (central).Readme
 * 
 * 
 * 
 */

@Injectable()
export class PlLoginService
{

  private httpClient   : HttpClient;
  private authService  : AuthService;
  private loggedIn     : boolean;

  constructor(_httpClient:HttpClient, _authService : AuthService )
  {
    this.authService  = _authService;
    this.httpClient   = _httpClient;
    this.loggedIn     = false;
  }

   /**
   * @method 
   * hasValidToken 
   * 
   * @param 
   * none
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * delivers if currently stored token is valid
   */

  login (form: LoginForm) : Observable<Token>
  {
    let body : string = JSON.stringify(form);

    console.log("Calling Login");
    return this.httpClient.post<Token>('/api/login', body, httpOptions);
  }

   /**
   * @method 
   * hasValidToken 
   * 
   * @param 
   * none
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * delivers if currently stored token is valid
   */

  logout()
  {
    if (this.authService.removeToken())
      this.loggedIn = false;
    
    this.authService.removeUser();
  }

   /**
   * @method 
   * hasValidToken 
   * 
   * @param 
   * none
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * delivers if currently stored token is valid
   */
  isLoggedIn() : boolean
  {
    console.log("Logging called");
    return this.loggedIn;
  }

  
   /**
   * @method 
   * setToken
   * 
   * @param 
   * Token --> Token der gesetzt werden soll
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * Methode ist ein Wrapper auf die gleiche Methode im  Authenfizierungsservice.
   * 
   * 
   */

  setToken(token : Token) : boolean
  {
    return this.authService.setToken(token);
  }

   /**
   * @method 
   * RemoveToken
   * 
   * @param 
   * none
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * Methode ist ein Wrapper auf die gleiche Methode im  Authenfizierungsservice. 
   * 
   * 
   */
  removeToken()
  {
    return this.authService.removeToken();
  }

  setLogin(loginStatus : boolean) : void
  {
    console.log("Called on setLogin");
    this.loggedIn = loginStatus;
  }
  toString() : string
  {
    return String(this.loggedIn);
  }
  setUser(userName : string) : void 
  {
    this.authService.setUser(userName);
  }
  getUser() : string
  {
    return this.authService.getUser();
  }
}
