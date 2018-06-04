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

import {Input , Component, OnInit }
from '@angular/core';

import { CalenderStoreService } 
from '../../services/calender-store.service';

@Component({
  selector: 'pl-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

  @Input()
  public currentWeekHeader  : Array<string> ;
  @Input ()
  public currentWeekNumber  : number;
  @Input ()
  public currentYear        : number;

  private csService         : CalenderStoreService;

  public nextWeek          : number;
  public lastWeek          : number;
  public hasLastWeek       : boolean;
  public hasNextWeek       : boolean;

  public daysOfTheWeek      : Array<string> = 
  [ 
      "filler",
      "Montag",
      "Dienstag",
      "Mittwoch", 
      "Donnerstag", 
      "Freitag", 
      "Samstag" 
  ];


  constructor(_csService : CalenderStoreService )
  {
    this.csService = _csService;
  }

  ngOnInit()
  {
    if (this.currentWeekNumber != 1)
    {
      this.lastWeek = this.currentWeekNumber - 1;
      this.hasLastWeek = true;
    }
    else 
    {
      this.hasLastWeek = false;
    }

    let weeksOfTheYear = this.csService.getWeeksOfTheYear(this.currentYear);
    if (this.currentWeekNumber < weeksOfTheYear)
    {
      this.nextWeek = this.currentWeekNumber*1 + 1*1;  
      this.hasNextWeek = true;
    }
    else 
    {
      this.hasNextWeek = false;
    } 
  }
  

}
