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

import { Component, OnInit, Input } from '@angular/core';
import { CalendarWeek }             from '../../shared/calender-week';
import { CalendarHeaderComponent }  from '../calendar-header/calendar-header.component';
import { CalendarContentComponent } from '../calendar-content/calendar-content.component';

@Component({
  selector: 'pl-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.css']
})
export class CalendarWeekComponent implements OnInit {

  @Input ()
  public calendarWeek : CalendarWeek ;

  constructor() { }

  ngOnInit()
  { 
 
  }

}
