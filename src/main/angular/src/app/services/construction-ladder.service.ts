
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
 * Copyright (c) 2018 by MAMB (Manuel Hubert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 * 
 */



import { Injectable } 
from '@angular/core';

import {IConstructionLadder}
from "../Resourcenpanel/IConstructionLadder";

import { BACKEND_URLS } 
from '../shared/backendUrls';

import { Observable }
from 'rxjs/Observable';

import { HttpHeaders, HttpClient } 
from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * 
 * @class ConstructionAreaService
 * 
 * Der ConstructionAreaService ist der Request Dienstleister für die angelegten und verwalteten 
 * Baustellen. Der Service stellt Methoden zum abfragen, verändern und permanenten Abspeichern von Baustellen 
 * im Backend zur Verfügung.
 * 
 * @see (central).Readme
 * 
 * 
 * 
 */
@Injectable()
export class ConstructionLadderService
{
  private httpClient : HttpClient

  
  constructor(_httpClient : HttpClient) 
  {
    this.httpClient = _httpClient;

  }

  public getAllContstructionLadders() : Observable<IConstructionLadder[]>
  {
    return this.httpClient.get<IConstructionLadder[]>
      (BACKEND_URLS.CONSTRUCTIONLADDER_URL, httpOptions);
  } 

}
