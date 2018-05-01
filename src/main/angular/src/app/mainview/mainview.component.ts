import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pl-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public year:    number;
  public calWeek: number;


  constructor(private route: ActivatedRoute) 
  {

  }

  ngOnInit()
  {
    const params = this.route.snapshot.params;
    this.calWeek = params['week'];
    this.year    = params['year'];
  }

}
