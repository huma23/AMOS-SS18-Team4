import {Input , Component, OnInit } from '@angular/core';

@Component({
  selector: 'pl-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

  @Input()
  public currentWeekHeader  : Array<string> ; 
  public daysOfTheWeek      : Array<string> = 
  [ 
      "filler",
      "Montag",
      "Dienstag",
      "Mittwoch", 
      "Donnerstag", 
      "Freitag", 
      "Samstag" 
  ];


  constructor() { }

  ngOnInit() {
    
  }

}
