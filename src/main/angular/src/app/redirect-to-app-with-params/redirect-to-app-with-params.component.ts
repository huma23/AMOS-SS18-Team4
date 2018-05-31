
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

import { Component, OnInit }
from '@angular/core';

import { Router }
from '@angular/router';

import { CalenderStoreService }
from '../services/calender-store.service';

import { FRONTEND_URLS }
from '../shared/frontEndUrls';

@Component({
  template:''
})


 /**
 * 
 * @class
 * RedirectToAppWithParamsComponent - DummyComponent. 
 * Die Klasse und Komponente leitet einen Aufruf auf /app um auf /app/aktuellesJahr/aktuelleWoche
 * 
 * Die Parameter aktuellesJahr und aktuelleWoche werden vom CalenderService bezogen.
 * 
 */

export class RedirectToAppWithParamsComponent implements OnInit {

  private router    : Router; 
  private csService : CalenderStoreService;

  constructor(_router : Router, _csService : CalenderStoreService)
  {
    this.router     = _router;
    this.csService  = _csService;

    let currentWeek = this.csService.currentWeek;
    let currentYear = this.csService.currentYear;
    let rerouteUrl  = FRONTEND_URLS.APP_URL + "/" + currentYear + "/" + currentWeek; 
    console.log("Rerouting App to : " + rerouteUrl);
    this.router.navigateByUrl(rerouteUrl);

  }

  ngOnInit()
  {

  }

}
