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

import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ResourceService} from "../resource.service";
import {Injectable} from "@angular/core";
import {IEmployee} from "../IEmployee";
import {IMaterial} from "../IMaterial";
import {IVehicle} from "../IVehicle";
import {CalenderStoreService} from "../../services/calender-store.service";


/**
 * Injectables für das Abfragen von Resourcen, vor dem Rendering der Hauptseite.
 * Genutzt im linken Resource-Panel.
 */
@Injectable()
export class EmployeeResolver implements Resolve<IEmployee[]>{

  constructor(private _resourceService: ResourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]> {

    let year = route.params['year'];
    let week = route.params['week'];
    return this._resourceService.getEmployeesWithinWeek(year,week);
  }
}

@Injectable()
export class MaterialResolver implements Resolve<IMaterial[]>{

  constructor(private _resourceService: ResourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMaterial[]> {
    let year = route.params['year'];
    let week = route.params['week'];
    return this._resourceService.getMaterialsWithinWeek(year,week);
  }
}

@Injectable()
export class VehicleResolver implements Resolve<IVehicle[]>{

  constructor(private _resourceService: ResourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicle[]> {

    let year = route.params['year'];
    let week = route.params['week'];
    return this._resourceService.getVehiclesWithinWeek(year, week);
  }
}
