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

import { Injectable }   from '@angular/core';
import { CalendarWeek}  from './calender-week' ;
import { ConstructionManager, CPlan } from './construction-manager';
import { ResourceService } from '../Resourcenpanel/resource.service';
import { IConstructionLadder }  from '../Resourcenpanel/IConstructionLadder';


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

  public today              : Date;
  
 
  public currentWeek        : number;
  public currentYear        : number;

  private weekInMS          : number  = 604800000;
  private currentYearHeader : Array<Date>;

  // Zugriff auf den Ressource Service, nötig um die Bauleiter resp. Daten aus der 
  // Ressource Api zu laden.
  private ressService : ResourceService;
  

  // BeispielWochenpläne der Bauleiter, reine Filler, bis Datentyp geklärt wurde
  public musterCPlan = new CPlan(17, "Musterstrasse", ["Max, Moritz, Frido"] );
  public musterCPArr =
  [
    this.musterCPlan, 
    this.musterCPlan, 
    this.musterCPlan,
    this.musterCPlan, 
    this.musterCPlan, 
    this.musterCPlan
  ];

  constructor(_resService : ResourceService) 
  {
    this.today              = new Date();
    this.currentYear        = this.today.getFullYear();
    this.currentYearHeader  = new Array<Date>();
    this.initCurrentYear();
    this.currentWeek        = this.getCurrentCalendarWeek();
    
    this.ressService = _resService;
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


  getCalendarWeek(year?:number, week?:number) :CalendarWeek
  {
    let result : CalendarWeek; 

    if (week)
      if(week > 52)
        week = this.currentWeek;
    
    
    if (year == this.currentYear)
    {
      let mondayOfSearchedWeek = this.currentYearHeader[week-1];
      let headerString : Array<string> = [];

       headerString.push(week.toString());
       
       for (let i = 0; i < 6; i++)
       {
         if (i != 0)
         mondayOfSearchedWeek.setDate(mondayOfSearchedWeek.getDate()+1);
         headerString.push((mondayOfSearchedWeek.getDate()+"."+(mondayOfSearchedWeek.getMonth()+1)).toString())
       }
        
       let cLadders : ConstructionManager[] = new Array();
       this.ressService.getConstructionLadder().subscribe((val : IConstructionLadder[]) =>
       {
         for (let tmp of val)
         {
           cLadders.push(new ConstructionManager(tmp,this.musterCPArr));
         }
       }); 

      
       result = new CalendarWeek(
        week,
        this.currentYear,
        headerString,
        cLadders
      );
    }
    else 
    {
      result = null;
    }
    return result;
  }
    /**
   * @method 
   * getCurrentCalendarWeek 
   * 
   * @param 
   * none
   * 
   * 
   * @return 
   * aktuelle Kalenderwoche : number 
   *  
   * @description
   * Die Methode berechnent die aktuelle Kalenderwoche, aus der Differenz der Millisekunden
   * heute und dem ersten Eintrag des Arrays, das als Member in der Klasse hinterlegt ist und alle
   * Kalenderwochen Montage gespeichert hat.  
   * 
   * Das Ergebnis wird gerunden und ergibt die aktuelle Woche.
   * 
   */
  getCurrentCalendarWeek() : number
  {
    const diff  = Math.ceil((Number(this.today) - Number(this.currentYearHeader[0])) / this.weekInMS);
    return diff;
  }
    /**
   * @method 
   * initCurrentYear 
   * 
   * @param 
   * none 
   * 
   * @return 
   * none 
   *  
   * @description
   * Die Methode initialisert das Array currentYearHeader<Date> das alle Montage der Kalenderwochen
   * im aktuellen Jahr gespeichert hat.
   * Dadurch lassen sich die Kalenderwochen schnell berechnen. 
   * 
   */

  private initCurrentYear()
  {
    const currentYear = this.today.getFullYear();
    const newYear     = new Date(currentYear,0,4);

    let firstMondayInFirstWeek = newYear;
  
    if (newYear.getDay() < 1)
    {
      firstMondayInFirstWeek.setDate(firstMondayInFirstWeek.getDate() +1 );
    }
    else 
    {
      
      while(firstMondayInFirstWeek.getDay() != 1)
        firstMondayInFirstWeek.setDate(firstMondayInFirstWeek.getDate() - 1 );
    }
     
      let day = firstMondayInFirstWeek;
     
      this.currentYearHeader.push(new Date(day));
      for (var i = 0; i < 52; i++)
      {
          day.setTime(day.getTime() + this.weekInMS);    
          this.currentYearHeader.push(new Date(day));
      }      
  }
}
