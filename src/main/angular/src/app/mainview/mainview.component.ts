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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderStoreService } from '../shared/calender-store.service';



@Component
({
  selector: 'pl-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})

/**
 * 
 * @class MainviewComponent
 * 
 * 
 * Klasse Mainviewkomponent ist für das Laden des Kalenders und der RessourceSidebar
 * verantwortlich. 
 * Desweiteren werden in dieser Klasse die Parameter der aufgerufenen Route abgefangen 
 * und entsprechend an die Kindsknoten im Komponentbaum weiterreicht 
 * @see (central).Readme
 * 
 * 
 * 
 */

 export class MainviewComponent implements OnInit {

  /**
   *  @member calYear : beschreibt das Kalenderjahr für das die Verarbeitung erfolgen soll
   *  @member calWeek : beschreibt die KalenderWoche
   *  
   */
  public calYear: number;
  public calWeek: number;


  constructor( private route: ActivatedRoute, 
               private cSS : CalenderStoreService, 
               private router : Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  }



  /**
   * @description
   * Initialisierungsfunktion der MainviewComponent
   * Fängt die Parameter der Route ab und schreibt diese in die Klassenmember, 
   * damit diese weiterverarbeitet werden können
   * 
   *  @param    --> none
   *  @returns  --> none
   * 
   */
  ngOnInit()
  {
   
   
    // speichert die aktuelle Belegung der Parameter im Routenpfad /app/:year/:week
    const params = this.route.snapshot.params;
    this.calWeek = params['week'];
    this.calYear = params['year'];

    // Wenn default Pfad aufgerufen wird, d.h. ohne Parameter /app setze aktuelles Jahr und
    // aktuelle Kalenderwoche
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
