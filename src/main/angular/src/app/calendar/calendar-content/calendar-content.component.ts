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

import { Input,Component, OnInit }  from '@angular/core';
import {CalenderStoreService} from "../../services/calender-store.service";
import {IConstructionLadder} from "../../Resourcenpanel/IConstructionLadder";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pl-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent implements OnInit {

  @Input()
  public calendarWeek : number;

  @Input()
  public calendarYear : number;

  @Input()
  public currentWeekHeader  : Array<string> ;

  public calWeeks: string[];
  public constructionManagers: IConstructionLadder[];
  public nextWeek          : number;
  public lastWeek          : number;
  public hasLastWeek       : boolean;
  public hasNextWeek       : boolean;

  public daysOfTheWeek      : Array<string> =
    [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag"
    ];

  constructor(private csService : CalenderStoreService, private route : ActivatedRoute) { }

  ngOnInit()
  {
    this.calWeeks = this.csService.getCalenderWeekHeaderDBFormat(this.calendarYear, this.calendarWeek);
    this.constructionManagers = this.route.snapshot.data['constructionLadders'];

    if (this.calendarWeek != 1)
    {
      this.lastWeek = this.calendarWeek - 1;
      this.hasLastWeek = true;
    }
    else
    {
      this.hasLastWeek = false;
    }

    let weeksOfTheYear = this.csService.getWeeksOfTheYear(this.calendarYear);
    if (this.calendarWeek < weeksOfTheYear)
    {
      this.nextWeek = this.calendarWeek*1 + 1*1;
      this.hasNextWeek = true;
    }
    else
    {
      this.hasNextWeek = false;
    }
  }
}
