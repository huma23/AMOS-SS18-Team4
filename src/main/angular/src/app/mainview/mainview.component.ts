import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderStoreService } from '../shared/calender-store.service';
@Component({
  selector: 'pl-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public calYear: number;
  public calWeek: number;


  constructor( private route: ActivatedRoute, 
               private cSS : CalenderStoreService, 
               private router : Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    
  }

  ngOnInit()
  {
    const params = this.route.snapshot.params;
    this.calWeek = params['week'];
    this.calYear = params['year'];

    // Wenn default Pfad aufgerufen wird, verwende aktuelles Jahr und die aktuelle
    // Woche.
    if (!this.calWeek)
    {
      this.calWeek = this.cSS.currentWeek;
    }
    
    if(!this.calYear)
    {
      //setzt das aktuelle Jahr
      this.calYear = new Date().getFullYear();
    }

  }

}
