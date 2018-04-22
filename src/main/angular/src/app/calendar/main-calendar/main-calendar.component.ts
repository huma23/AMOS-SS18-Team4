import { Component, OnInit } from '@angular/core';
import {CalendarContentComponent} from '../calendar-content/calendar-content.component';
import {CalendarHeaderComponent } from '../calendar-header/calendar-header.component';


@Component({
  selector: 'pl-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
