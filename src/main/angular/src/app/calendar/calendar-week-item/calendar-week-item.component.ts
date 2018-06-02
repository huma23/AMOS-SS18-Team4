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

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IConstructionArea} from "../../Resourcenpanel/IConstructionArea";
import {IConstructionLadder} from "../../Resourcenpanel/IConstructionLadder";

@Component({
  selector: 'pl-calendar-week-item',
  templateUrl: './calendar-week-item.component.html',
  styleUrls: ['./calendar-week-item.component.css']
})
export class CalendarWeekItemComponent implements OnInit {

  @Input()
  public date : string;

  @Input()
  public bauleiter: IConstructionLadder;

  public constructionAreas: IConstructionArea[];

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    let allAreas = this.route.snapshot.data['constructionAreas'];
    this.constructionAreas = this.getMyAreas(allAreas);
  }

  private getMyAreas(areas : IConstructionArea[]): IConstructionArea[]{

    let array : IConstructionArea[] = new Array<IConstructionArea>();

    for(let area of areas){
      if(area.permanent === false) {
        //bauleiter ist gleich
        if (area.bauleiter.firstName === this.bauleiter.firstName && area.bauleiter.lastName === this.bauleiter.lastName) {
          //Datum prüfen
          if(area.days[this.date] !== undefined){
            array.push(area);
          }
        }
      }
    }

    return array;
  }
}
