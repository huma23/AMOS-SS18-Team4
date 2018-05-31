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

import { Injectable }                   
from '@angular/core';

import { CalendarWeek}                  
from '../shared/calender-week' ;

import { ConstructionManager, CPlan }   
from '../shared/construction-manager';

import { IConstructionLadder }          
from '../Resourcenpanel/IConstructionLadder';

import { HttpClient, HttpErrorResponse }
from '@angular/common/http';

import { ConstructionArea }
from '../../model/constructionArea';

import { Employee }
from '../../model/employee';

import {BACKEND_URLS}
from  "../shared/backendUrls";

import * as moment
from 'moment';

import 'moment/locale/pt-br';

import { IConstructionArea }
from '../Resourcenpanel/IConstructionArea';

import { Observable }
from 'rxjs/Observable';





 /**
 * 
 * @class CalendarStoreService
 * 
 * Der CalendarStoreService berechnent die aktuelle und fortschreitende KalenderWochen, 
 * aus der übergebenen Jahr und Woche. 
 * Desweiteren lädt der Service Daten aus dem Backend (Ressource: Bauleiter), die zur 
 * Anzeige innerhalb der KalenderView nötig sind. 
 * 
 * @see (central).Readme
 * 
 * 
 * 
 */

@Injectable()
export class CalenderStoreService
{

  public  currentWeek : number;
  public  currentYear : number;
  private httpClient  : HttpClient;

  constructor(_httpClient: HttpClient) 
  {
    this.httpClient         = _httpClient;
    
    //Moment auf die deutsche Umgebung umstellen
    moment.locale('de');
    this.currentWeek        = moment().isoWeek();
    this.currentYear        = moment().year();
    
    //------------------------------------------------------------------------------
  }

  /**
   * @method 
   * getCalendarWeek 
   * 
   * @param 
   * year : optional:  number => Kalenderjahr, für das die Woche berechnent werden soll
   * week : optional: number (0-52/53) Kalenderwoche, die berechnent werden soll
   * 
   * Werden keine Parameter übergeben, wird die aktuelle Kalenderwoche und das aktuelle
   * Kalenderjahr verwendet
   * 
   * 
   * 
   * @return 
   * CalenderWeek
   * => berechnete Woche mit den dazugehörigen Wochentagen + Datum, sowie 
   * die Liste der Bauleiter und deren zugehörigen Wochenplänen (statisch) 
   *  
   * @description
   * Die Methode errechnet aus dem übergebenen Jahr und Woche die Kalenderwoche. 
   * D.h. die numerischen Wochentage. 
   * Desweiteren werden die zur errechneten Woche zugehörigen Bauleiter, inklusive der
   * Wochenpläne aus Ressource Service geladen. 
   * 
   * 
   * 
   */


  getCalendarWeek(year?:number, week?:number, constructionAreas ?: IConstructionArea[], 
  constructionLadders ?: IConstructionLadder[] ) : CalendarWeek
  {
    let cAreas : ConstructionArea[] = constructionAreas;
    let result : CalendarWeek; 

    if (week)
    {
      if(week > moment().year(year).weeksInYear())
      {
        week = moment().year(year).weeksInYear();
      }
      if (week < 1)
    
      week = 1;
    }

    let urlWithParam : string = (BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + year + "/" + week);
    let aktiveConstructionAreas : ConstructionArea[] =  new Array<ConstructionArea>();
    
    cAreas.forEach( element => 
    {
      if (!element.permanent)
      {
        aktiveConstructionAreas.push(element);
      }
    });

     
     // Hole alle Bauleiter       
      let cLadders  : ConstructionManager[] = this.getConstructionManagers(constructionLadders);

      // Kombiniere Bauleiter mit den Baustellen 
      for (let i = 0; i < aktiveConstructionAreas.length; i++ )
      {
        let cArea     = aktiveConstructionAreas[i];
        
        let cManager = null;
        let index = 0;
        for (let j = 0; j < cLadders.length; j++)
        {
          if ((cLadders[j].firstName === cArea.bauleiter.firstName) && 
              (cLadders[j].lastName === cArea.bauleiter.lastName))
          {
            cManager = cLadders[j];
            index = j;
          }
        }
        if (cManager === null || cManager === undefined)
          continue;
        else   
          cLadders[index] = this.combineAreasWithManagers(cArea, cManager);
      }
    
     // Hole den aktuellen Wochenheader und füge noch die Kalenderwoche hinzu 
      let calHeader : string [] = this.getCalenderWeekHeader(year,week);
      console.log(aktiveConstructionAreas.length);
      calHeader.unshift(week.toString());
    
        result = new CalendarWeek(
        week,
        this.currentYear,
        calHeader,
        cLadders
      );
    return result;
  }

  /**
   * @method 
   * getCalenderWeekHeader
   * 
   * @param 
   * year   :  Jahr für das die Woche geholt werden soll
   * number :
   * 
   * @return 
   * String Array
   *  
   * @description
   * Methode erstellt für die übergebenen Parameter eine Kalenderwoche von 
   * Montag - Samstag und gibt diese als String zurück. 
   * 
   * 
   */
  private getCalenderWeekHeader ( year:number, week:number) : string [] 
  {
    
    let searchedWeekResult : string[] = new Array<string>();
    let currentMoment = moment().year(year).isoWeek(week);
   
    for(let day = 1; day < 7; day++)
    {
      let tmp = currentMoment.isoWeekday(day).format("Do MMM");
      searchedWeekResult.push(tmp);
    }
    
    return searchedWeekResult;
  }

  /**
   * @method 
   * getContstructionManager
   * 
   * @param 
   * none
   * 
   * 
   * @return 
   * alle gespeicherten Bauleiter als Array.
   *  
   * @description
   * Die Methode holt mithilfe des ResourceServices die aktuell im Storage 
   * gespeicherten Bauleiter. 
   * 
   * 
   */
  private getConstructionManagers( ladders  : IConstructionLadder[] ) : ConstructionManager[]
  {
    
    let cLadders : ConstructionManager[] = new Array();
    ladders.forEach( val =>
    {
      
        cLadders.push(new ConstructionManager(val));
    });

    return cLadders;
  }
  
 
  /**
   * @method 
   * combineAreasWithManagers
   * 
   * @param 
   * cArea:ConstructionArea
   * cManager : ConstructionManager
   *  
   * 
   * @return 
   * ConstructionManager
   *  
   * @description
   * Methode verknüpft eine Baustelle mit einem BaustellenManager aus dem FrontEnd Bereich. 
   * Aus der übergebenen Baustelle wird bei passender Validierung des Datums ein neuer Cplan 
   * erstellt und dem Manager in sein lokales Cplan Array eingetragen. 
   * 
   * 
   */
  private combineAreasWithManagers 
  (cArea:ConstructionArea, cManager : ConstructionManager) : ConstructionManager  
  {
      let result            = cManager;
      let constructionBegin = moment(cArea.startDate);  
      let constructionEnd   = moment(cArea.endDate);
      let newConstPlan      = new CPlan(cArea.name, cArea.employees,cArea.vehicles, cArea.materials);
      
      
      if (constructionBegin.isSame(constructionEnd))
      {
        let weekDay = constructionBegin.weekday();
        result.constructionPlans[weekDay] = newConstPlan;
      
      }
      else 
      {
        // liegt die Baustelle innerhalb der selben Woche ?
        if (constructionBegin.isoWeek() === constructionEnd.isoWeek())
        {          
          while (!constructionBegin.isSame(constructionEnd))
          {
            result[constructionBegin.weekday()] = newConstPlan;   
            constructionBegin.add(1,'day');
          }
      
        }
        else 
        {
          const weekNr = constructionBegin.isoWeek();
          while(constructionBegin.isoWeek() == weekNr && constructionBegin.weekday() != 6 )
          {
            result[constructionBegin.weekday()] = newConstPlan;
            constructionBegin.add(1, 'day');
          }
        }
      }
      return result;
  }
}
