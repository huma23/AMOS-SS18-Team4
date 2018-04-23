/**
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
