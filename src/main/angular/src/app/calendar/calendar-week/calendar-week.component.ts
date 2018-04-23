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
