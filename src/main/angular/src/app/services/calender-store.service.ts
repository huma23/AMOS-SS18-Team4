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

import { Injectable }                   from '@angular/core';
import { HttpClient}                   from '@angular/common/http';
import "../shared/backendUrls";
import * as moment                      from 'moment';

import 'moment/locale/pt-br';
import {CalendarWeek} from "../shared/calender-week";

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


  getCalendarWeek(year?:number, week?:number) : CalendarWeek
  {
    //let cAreas : ConstructionArea[];
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

    //Hole den aktuellen Wochenheader und füge noch die Kalenderwoche hinzu
    let calHeader : string [] = this.getCalenderWeekHeader(year,week);
    calHeader.unshift(week.toString());
    result = new CalendarWeek(
      week,
      this.currentYear,
      calHeader,
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
    return this.getCalenderWeekInFormat(year, week, "Do MMM");
  }

  
  /**
   * @method
   * 
   *
   * @param
   *  
   *
   * @return
   * String Array
   *
   * @description
   *
   *
   */
  public getCalenderWeekHeaderDBFormat (year:number, week:number) : string []
  {
    return this.getCalenderWeekInFormat(year, week, "YYYY-MM-DD");
  }

  
  /**
   * @method
   * 
   *
   * @param
   * 
   * 
   *
   * @return
   * 
   *
   * @description
   *
   *
   *
   */
  private getCalenderWeekInFormat(year:number, week:number, format:string) : string[]
  {
    let searchedWeekResult : string[] = new Array<string>();
    let currentMoment = moment().year(year).isoWeek(week);

    for(let day = 1; day < 7; day++)
    {
      let tmp = currentMoment.isoWeekday(day).format(format);
      searchedWeekResult.push(tmp);
    }

    return searchedWeekResult;
  }
  
  /**
   * @method
   * getWeeksOfTheYear
   *
   * @param
   * year   :  Jahr für das die Wochen geholt werden soll
   * 
   *
   * @return
   * number
   *
   * @description
   * Gibt die Anzahl der Wochen in dem angefragten Jahr zurück. 
   *
   *
   */

  public getWeeksOfTheYear(year : number ) : number
  {
    return moment().year(year).isoWeeksInYear();
  }
}
