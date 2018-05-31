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

import {Component, Input, OnInit} from "@angular/core";
import {IConstructionArea, IConstructionAreaDay} from "../../Resourcenpanel/IConstructionArea";

@Component({
  selector: 'pl-calender-construction-area',
  templateUrl: './calender-construction-area.component.html',
  styleUrls: ['./calender-construction-area.component.css']
})
export class CalenderConstructionAreaComponent implements OnInit{

  @Input()
  public constructionArea : IConstructionArea;

  @Input()
  public  date : string;

  public constructionAreaDay : IConstructionAreaDay;

  ngOnInit(): void {
    this.constructionAreaDay = this.constructionArea.days[this.date];
  }
}
