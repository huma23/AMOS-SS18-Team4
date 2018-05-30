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
import { ConstructionManager, CPlan}       from '../../shared/construction-manager';
import { CalendarWeekItemComponent} from '../calendar-week-item/calendar-week-item.component' ;

@Component({
  selector: 'pl-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent implements OnInit {

  @Input()
  public constructionManagers  : Array<ConstructionManager>;


  constructor( ) { }

  ngOnInit()
  {
  
  }
  hasPlanForToday(plan:CPlan) : boolean
  {
    if (plan === undefined || plan === null)
      return false;

    if(plan.projectName === undefined || plan.projectName === null)
      return false;

    if (plan.coWorkers === undefined || plan.coWorkers === null)
      return false;
    
      
    return true;
  }

}
