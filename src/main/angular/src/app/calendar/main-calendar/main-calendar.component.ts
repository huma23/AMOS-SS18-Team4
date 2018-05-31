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

import { Component, OnInit, Input }
from '@angular/core';

import { CalendarContentComponent}
from '../calendar-content/calendar-content.component';

import { CalendarHeaderComponent }
from '../calendar-header/calendar-header.component';

import { CalenderStoreService}
from '../../services/calender-store.service';

import { CalendarWeekComponent}
from '../calendar-week/calendar-week.component';

import { CalendarWeek }
from '../../shared/calender-week';

import {ActivatedRoute} 
from "@angular/router";

import {IConstructionArea} 
from "../../Resourcenpanel/IConstructionArea";
import { IConstructionLadder } from '../../Resourcenpanel/IConstructionLadder';


@Component({
  selector: 'pl-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit
{
  @Input()
  public calendarWeek : number;

  @Input()
  public calendarYear : number;

  public calWeek : CalendarWeek;

  public constructionAreas : IConstructionArea[];

  public constructionLadders : IConstructionLadder[];

  constructor(private csService : CalenderStoreService, private route : ActivatedRoute) { }

  ngOnInit()
  {
    //Hier werden alle Daten mitgeliefert über die Route
    this.constructionAreas = this.route.snapshot.data['constructionAreas'];
    
    this.constructionLadders = this.route.snapshot.data['constructionLadders'];
    this.calWeek = this.csService.getCalendarWeek(this.calendarYear, this.calendarWeek,
      this.constructionAreas, this.constructionLadders);
  }
}
