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
import { CalendarWeek} from './calender-week' ;
import { ConstructionManager, CPlan } from './construction-manager';


@Injectable()
export class CalenderStoreService
{

  public today  : Date;
  public cW     : Array<CalendarWeek> ;

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
    this.today = new Date();
    this.cW = [new CalendarWeek
      (
        17, 
        2018, 
        ["17", "23.04","24.04", "25.04", "26.04", "27.04", "28.04"], 
        [ 
          new ConstructionManager("Müller","Hans","Bauleiter" , this.musterCPArr),
          new ConstructionManager("Schmidt","Uwe","Bauleiter" , this.musterCPArr), 
          new ConstructionManager("Schulz","Peter","Bauleiter", this.musterCPArr)
        ]       
      )
    ]
  }
  
  getCalendarWeeks() : Array<CalendarWeek>
  {
    return this.cW;
  }
}
