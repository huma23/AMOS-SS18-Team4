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

import { Component, OnInit, Input } from '@angular/core';
import { ConstructionArea } from '../../../model/constructionArea';
import * as moment from "moment";
import { Employee } from '../../../model/employee';
import { Vehicle } from '../../../model/vehicle';
import { Material } from '../../../model/material';
import * as _ from "lodash";

@Component({
  selector: 'pl-base-information',
  templateUrl: './base-information.component.html',
  styleUrls: ['./base-information.component.css']
})
/**
 *
 * @class BaseInformationComponent
 *
 * 
 *
 *
 */
export class BaseInformationComponent implements OnInit {

  @Input()
  public constructionArea : ConstructionArea

  private usedEmployees : Employee[];
  private usedVehicles  : Vehicle[];
  private usedMaterials : Material[];

  constructor()
  {
    this.usedEmployees  = new Array<Employee>();
    this.usedVehicles   = new Array<Vehicle>();
    this.usedMaterials  = new Array<Material>();
  }

  ngOnInit()
  {
    this.initUsedRessources();
  }
   /**
   * @method
   * getProjectTime()
   * 
   *
   * @param
   * none
   *
   * @return
   * string
   *
   * @description
   * Konvertiert das Startdatum des Projekts sowie das Enddatum in DD.MM.YYYY format und verkettet 
   * die beiden und gibt das Ergebnis als String zurück
   *
   *
   */
  public getProjectTime() : string
  {
    return moment(this.constructionArea.startDate).format("DD.M.YYYY") + " - " + 
    moment(this.constructionArea.endDate).format("DD.M.YYYY")
  }
     /**
   * @method
   * initUsedRessources()
   * 
   *
   * @param
   * none
   *
   * @return
   * none
   *
   * @description
   * Initialisiert die Attribute usedEmployees, usedVehicles, usedMAterials mit den Werten aus den
   * 
   *
   */
  private initUsedRessources()
  {
    for (let key in this.constructionArea.days)
    {
      // _.uniqBY merged 2 Arrays ohne duplicate und verwendet Stringify als Comparator
      this.usedEmployees  = _.uniqBy([...this.usedEmployees, ...this.constructionArea.days[key].employeeList], JSON.stringify);
      this.usedMaterials  = _.uniqBy([...this.usedMaterials, ...this.constructionArea.days[key].materialList], JSON.stringify);
      this.usedVehicles   = _.uniqBy([...this.usedVehicles, ...this.constructionArea.days[key].vehicleList], JSON.stringify);
    }
  }
     /**
   * @method
   * hasMaterialUsage()
   * 
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   * Liefert True wenn Betriebsmittel eingesetzt wurden, false wenn nicht
   *
   *
   */
  public hasMaterialUsage()
  {
    return (this.usedMaterials.length > 0);
  }
     /**
   * @method
   * hasVehicleUsage()
   * 
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   * Liefert True wenn Fahrzeuge eingesetzt wurden, false wenn nicht
   *
   *
   */
  public hasVehicleUsage()
  {
    return (this.usedVehicles.length > 0);
  }
     /**
   * @method
   * hasEmployeeUsage()
   * 
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   * Liefert True wenn Mitarbeiter eingesetzt wurden, false wenn nicht
   *
   *
   */
  public hasEmployeeUsage()
  {
    return (this.usedEmployees.length > 0);
  }
     /**
   * @method
   * getUsedMaterials()
   * 
   *
   * @param
   * none
   *
   * @return
   * Material [] 
   *
   * @description
   * Getter für das Attribut usedMAterials, liefert die in dem Projekt eingesetzten
   * Betriebsmittel
   *
   *
   */
  public getUsedMaterials() : Material [] 
  {
    return this.usedMaterials;
  }
     /**
   * @method
   * getUsedVehicles()
   * 
   *
   * @param
   * none
   *
   * @return
   * Vehicle[]
   *
   * @description
   * Getter für das Attribut usedVehicles, liefert die in dem Projekt eingesetzten
   * Fahrzeuge
   *
   *
   */
  public getUsedVehicles() : Vehicle[]
  {
    return this.usedVehicles;
  }
     /**
   * @method
   * getUsedEmployees()
   * 
   *
   * @param
   * none
   *
   * @return
   * Employee[] 
   *
   * @description
   * Getter für das Attribut usedEmployees, liefert die in dem Projekt eingesetzten
   * Arbeiter
   *
   *
   */
  public getUsedEmployees () : Employee[] 
  {
    return this.usedEmployees;
  }

}
