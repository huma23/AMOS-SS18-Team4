
import { Injectable } from '@angular/core';
import { CalendarWeek} from './calender-week' ;


@Injectable()
export class CalenderStoreService
{

  public today  : Date;
  public cW     : CalendarWeek ;
  static DaysOfTheWeek : Array<string> = ["Montag","Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]; 
  constructor() 
  {
    this.today = new Date();
    this.cW = new CalendarWeek(
      this.createActualCalendarWeek(), 
      2018, 
      [], 
      [],       
    )
  }

  createCalendarWeek() : Array<string>
  {
    let result : Array<string>;
    result.push( "Kalenderwoche" + this.createCalendarWeek())
    let firstDayofThisWeek = new Date (this.today) ;
    for (let i = this.today.getDay(); i >= 0; i--)
    {
      firstDayofThisWeek.setDate(firstDayofThisWeek.getDate()-1);
    }
    for (let i = 0; i < 7; ++i)
    {
      result[i] = CalenderStoreService.DaysOfTheWeek[i] + firstDayofThisWeek.getDay();
      firstDayofThisWeek.setDate(firstDayofThisWeek.getDate()+1);
    }
    
    return result;
  }
  createActualCalendarWeek () : number 
  {
    return 15;
    /*
    let tmp = new Date ();
    tmp.setHours(0,0,0);
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    return Math.ceil((((tmp - new Date(tmp.getFullYear(), 0,1))/8.64e7)+1)/7);
    */
  }

  
  getCalendarWeeks() : Array<CalendarWeek>
  {
    return [this.cW];
  }
}
