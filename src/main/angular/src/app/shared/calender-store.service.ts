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


@Injectable()
export class CalenderStoreService
{

  public today              : Date;
  
  public cW                 : Array<CalendarWeek> ;
  public currentWeek        : number;
  public currentYear        : number;

  private weekInMS          : number  = 604800000;
  private currentYearHeader : Array<Date>;
  

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

  constructor() 
  {
    this.today              = new Date();
    this.currentYear        = this.today.getFullYear();
    this.currentYearHeader  = new Array<Date>();
    this.initCurrentYear();
    this.currentWeek        = this.getCurrentCalendarWeek();
    //------------------------------------------------------------------------------
    this.cW = [new CalendarWeek
      (
        this.currentWeek, 
        this.currentYear, 
        [this.currentWeek.toString(), "23.04","24.04", "25.04", "26.04", "27.04", "28.04"], 
        [ 
          new ConstructionManager("Müller","Hans","Bauleiter" , this.musterCPArr),
          new ConstructionManager("Schmidt","Uwe","Bauleiter" , this.musterCPArr), 
          new ConstructionManager("Schulz","Peter","Bauleiter", this.musterCPArr)
        ]       
      )
    ]
  }
  
  getCalendarWeek(year?:number, week?:number) : Array<CalendarWeek>
  {

    var result : Array<CalendarWeek> = new Array<CalendarWeek>(); 

    if (week)
      if(week > 52)
        week = this.currentWeek;
    
    
    if (year == this.currentYear)
    {
      //var diff  = Math.ceil((Number(this.today) - Number(this.currentYearHeader[0])) / this.weekInMS);
      var mondayOfSearchedWeek = this.currentYearHeader[week-1];

      let headerString : Array<string> = [];

       headerString.push(week.toString());
       
       for (let i = 0; i < 6; i++)
       {
         if (i != 0)
         mondayOfSearchedWeek.setDate(mondayOfSearchedWeek.getDate()+1);
         headerString.push((mondayOfSearchedWeek.getDate()+"."+(mondayOfSearchedWeek.getMonth()+1)).toString())
       }
        
      result.push( new CalendarWeek(
        week,
        this.currentYear,
        headerString,
        [ 
          new ConstructionManager("Müller","Hans","Bauleiter" , this.musterCPArr),
          new ConstructionManager("Schmidt","Uwe","Bauleiter" , this.musterCPArr), 
          new ConstructionManager("Schulz","Peter","Bauleiter", this.musterCPArr)
        ]       

      ));
      
    }
    else 
    {
      
    }
    return result;
  }
  getCurrentCalendarWeek() : number
  {
    var diff  = Math.ceil((Number(this.today) - Number(this.currentYearHeader[0])) / this.weekInMS);
    console.log("WErt von res =  " + this.currentYearHeader[0].toString());
    return diff;
  }
  
  private initCurrentYear()
  {
    var currentYear = this.today.getFullYear();
    var newYear     = new Date(currentYear,0,4);

    var firstMondayInFirstWeek = newYear;
  
    if (newYear.getDay() < 1)
    {
      firstMondayInFirstWeek.setDate(firstMondayInFirstWeek.getDate() +1 );
    }
    else 
    {
      
      while(firstMondayInFirstWeek.getDay() != 1)
        firstMondayInFirstWeek.setDate(firstMondayInFirstWeek.getDate() - 1 );
    }
     
      var day = firstMondayInFirstWeek;
     
      this.currentYearHeader.push(new Date(day));
      for (var i = 0; i < 52; i++)
      {
          day.setTime(day.getTime() + this.weekInMS);    
          this.currentYearHeader.push(new Date(day));
      }      
  }
}
