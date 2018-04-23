import { Component, OnInit, Output }  from '@angular/core';
import { CalendarContentComponent}    from '../calendar-content/calendar-content.component';
import { CalendarHeaderComponent }    from '../calendar-header/calendar-header.component';
import { CalenderStoreService}        from '../../shared/calender-store.service';
import { CalendarWeekComponent}       from '../calendar-week/calendar-week.component';
import { CalendarWeek }               from '../../shared/calender-week';

@Component({
  selector: 'pl-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit
{
  
  private calWeeks              : Array<CalendarWeek>;



  constructor(private csService : CalenderStoreService) { } 

  ngOnInit()
  {
    this.calWeeks = this.csService.getCalendarWeeks();
  }

}
