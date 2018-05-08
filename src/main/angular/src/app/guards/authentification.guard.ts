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

import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


/**
 * 
 *  @class AuthentificationGuard
 * 
 *  -> The Class represants the Guard to protect the app route from unauthorized 
 *     use. 
 *     The Guard checks the local Storage if already a valid Token from Server is accessible, 
 *     if not the user is redirected to the login Service. 
 *     
 *     If the token exists, the access on app is granted.  
 */

const  TokenIdentifier : string = 'PlAccessToken';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  
  private accessToken : string;
  
  constructor(private router:Router)
  {
    localStorage.setItem(TokenIdentifier,"1234567444566855SSBBSjnuin");
  }
  
  canActivate() : boolean{

    console.log("Request on Auth Guard for App Module");
    this.accessToken = window.localStorage.getItem("PlAccessToken");

    if (null == this.accessToken)
      this.router.navigateByUrl('/login');
    
      return (this.accessToken != null);
  }

  storeToken( token:string ) : void 
  {
    localStorage.setItem(TokenIdentifier,token);
  }
  getToken() : string
  {
    return localStorage.getItem(TokenIdentifier);
  }
}
