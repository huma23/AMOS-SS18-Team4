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

import { BACKEND_URLS }
from '../shared/backendUrls';

import {Observable}
from 'rxjs/Observable';

import { HttpHeaders, HttpClient }
from '@angular/common/http';

import { CalenderStoreService }
from './calender-store.service';
import {IConstructionLadder} from "../Resourcenpanel/IConstructionLadder";
import {IConstructionArea, IFileInfo} from "../Resourcenpanel/IConstructionArea";
import {FormGroup} from "@angular/forms";


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
export class ConstructionAreaService
{

  private httpClient : HttpClient;
  private csService  : CalenderStoreService;

  constructor(_httpClient : HttpClient, _csService : CalenderStoreService)
  {
    this.httpClient = _httpClient;
    this.csService  = _csService;
  }

/**
   * @method
   * getConstructionAreasByWeekAndYear
   *
   * @type async
   *
   * @param
   * year : optional:  number => Kalenderjahr, für das die Woche berechnent werden soll
   * week : optional: number (0-52/53) Kalenderwoche, die berechnent werden soll
   *
   * Werden keine Parameter übergeben, wird die aktuelle Kalenderwoche und das aktuelle
   * Kalenderjahr verwendet

   * @return
   * Observable<ConstructionArea[]>
   *
   *
   * @description
   *
   * Methode liefert mithilfe eines HTTP-Requests auf das Backend alle Baustellen, die
   * in der angegeben Woche und Jahr abgespeichert wurden.
   *
   */

  public getConstructionAreasByWeekAndYear( year ? : string, week ? : string)
    : Observable<IConstructionArea[]>
  {
    if (year === null || year === undefined || year === "")
    {
      year = this.csService.currentYear.toString();
    }
    if (week === null || week === undefined || week === "")
    {
      week = this.csService.currentWeek.toString();
    }
    let urlWithParams = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + year + "/" + week;
    return this.httpClient.get<IConstructionArea[]>(urlWithParams, httpOptions);
  }

  /**
   * @method
   * getConstructionAreasPermanent
   *
   * @type async
   *
   * @param
   * none
   *
   *

   * @return
   * Observable<ConstructionArea[]>
   *
   *
   * @description
   *
   * Methode liefert mithilfe eines HTTP-Requests auf das Backend alle Baustellen, die
   * als Dauerbaustellen angelegt wurden.
   *
   */
  getConstructionAreasPermanent():Observable<IConstructionArea[]>
  {
    return this.httpClient.get<IConstructionArea[]>(BACKEND_URLS.CONSTRUCTION_AREA_PERMANENT_URL, httpOptions);
  }
 /**
   * @method
   * getAllSavedConstructionAreas
   *
   * @type async
   *
   * @param
   * none
   *
   * @return
   * Observable<ConstructionArea[]>
   *
   *
   * @description
   *
   * Methode liefert mithilfe eines HTTP-Requests auf das Backend alle Baustellen, die
   * abgespeichert wurden.
   *
   */
  public getAllSavedConstructionAreas () : Observable<IConstructionArea[]>
  {
    return this.httpClient.get<IConstructionArea[]>(BACKEND_URLS.CONSTRUCTION_AREA_URL, httpOptions);
  }

  /**
   * @method
   * getConstructionLadders
   *
   * @type async
   *
   * @param none
   *
   * @returns {Observable<IConstructionLadder[]>}
   *
   * @description
   * Methode liefert alle verfügbaren Bauleiter zurück
   */
  public getConstructionLadders():Observable<IConstructionLadder[]>{
    return this.httpClient.get<IConstructionLadder[]>(BACKEND_URLS.CONSTRUCTIONLADDER_URL);
  }

  public uploadFileRequest(form:FormGroup, id: string, name: string):Observable<IFileInfo>{
    debugger;
    let formData = new FormData();
    formData.append('file', form.value, name);
    let url = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + id + BACKEND_URLS.CONSTRUCTION_AREA_UPLOAD_ATT_PART;
    return this.httpClient.post<IFileInfo>(url, formData);
  }
}
