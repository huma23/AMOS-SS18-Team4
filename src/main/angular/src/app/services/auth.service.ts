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
import { HttpClient } from '@angular/common/http'; 
import { Token      } from '../../model/token'; 
//import { moment }     from 'moment/moment'; -> erst interessant wenn der Token auslaufen soll
/**
 * 
 * @class AuthService
 * 
 * 
 * The AuthService is responsible to store and handle the currently Token, 
 * which the User  received after succesfull authenticate on server.
 * 
 * The token is saved within an key-value store statically, until it is removed. 
 * 
 * 
 *  
 */
const TokenIdentifier : string = 'PlAccessToken';
const TokenExpiration : string = 'PLExpirationTime';

@Injectable()
export class AuthService
{

  //httpHandle needed for Server Communication 
  private httpClient : HttpClient;

  // Only for feature Test, Logic for refresh and validate on Expiration will come
  private gotValidToken : boolean;
  
  constructor(_httpClient:HttpClient) 
  { 
    this.httpClient     = _httpClient;
    this.gotValidToken  = false;
  }

  /**
   * @method 
   * getToken 
   * 
   * @param 
   * none
   * 
   * @return 
   * Token 
   *  
   * @description
   * 
   * The method delivers the currently stored token from Storage. 
   * If there is none, the delivered Token will be empty.
   */
  public getToken() : Token 
  {
    let result : Token;

    result.token      = localStorage.getItem(TokenIdentifier);
    result.timestampt = localStorage.getItem(TokenExpiration);
    
    return result;
    
  }

  // Not Implemented Yet
  public getExpirationTime() : string 
  {
    // Not Used currently
    return "";
  }

  /**
   * @method 
   * setToken 
   * 
   * @param 
   * Token
   * 
   * @return 
   * true on success
   * false otherwise 
   *  
   * @description
   * 
   * The method stores a token within the Webstorage. 
   * Caution there is no check if the Token is valid or has values. 
   * The old stored Token is overwritten.
   */
  public setToken(token : Token ) : boolean
  {
    if (!token)
      return false;
    this.gotValidToken = true;
    localStorage.setItem(TokenIdentifier, token.token);
    localStorage.setItem(TokenExpiration, token.timestampt);
    return true;
  }
 
  /**
   * @method 
   * removeToken 
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
   * Removes the currently stored Token
   */

  public removeToken() : boolean
  {
    localStorage.removeItem(TokenIdentifier);
    
    if (localStorage.getItem == null)
      return true;
    else 
      return false;
  }

  //NotImplemented yet
  public refreshToken() : void 
  {

    // Not Used currently
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
  public hasValidToken() : boolean 
  {
    return this.gotValidToken;
  }
}
