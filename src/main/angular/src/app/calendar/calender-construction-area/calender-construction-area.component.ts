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

import {Component, Input, OnInit} from "@angular/core";
import {IConstructionArea, IConstructionAreaDay} from "../../Resourcenpanel/IConstructionArea";
import { Employee } from "../../../model/employee";
import { Vehicle } from "../../../model/vehicle";
import { Material } from "../../../model/material";
import {IEmployee} from "../../Resourcenpanel/IEmployee";
import {IVehicle} from "../../Resourcenpanel/IVehicle";
import {IMaterial} from "../../Resourcenpanel/IMaterial";
import {AddResourceService} from "../../services/add-resource.service";

@Component({
  selector: 'pl-calender-construction-area',
  templateUrl: './calender-construction-area.component.html',
  styleUrls: ['./calender-construction-area.component.css']
})
export class CalenderConstructionAreaComponent implements OnInit{

  @Input()
  public constructionArea : IConstructionArea;

  @Input()
  public  date : string;

  public constructionAreaDay : IConstructionAreaDay;

  private resourceService : AddResourceService;

  constructor(_resService: AddResourceService){
    this.resourceService = _resService;
  }

  ngOnInit(): void
  {
    this.constructionAreaDay = this.constructionArea.days[this.date];

    if (this.constructionAreaDay.employeeList === (null|| undefined))
      this.constructionAreaDay.employeeList = new Array<Employee>();

    if (this.constructionAreaDay.materialList === (null || undefined))
      this.constructionAreaDay.materialList = new Array<Material>();

    if (this.constructionAreaDay.vehicleList === (null || undefined))
      this.constructionAreaDay.vehicleList = new Array<Vehicle>();
  }

  public hasEmployees() : boolean
  {
    if (this.constructionAreaDay.employeeList === null || this.constructionAreaDay.employeeList === undefined)
      return false;

    return true;
  }
  public hasVehicles() : boolean
  {
    if (this.constructionAreaDay.vehicleList === null || this.constructionAreaDay.vehicleList === undefined)
      return false;

    return true;
  }
  public hasMaterials() : boolean
  {
    if (this.constructionAreaDay.materialList === null || this.constructionAreaDay.materialList === undefined)
      return false;

    return true;
  }
  public onDropItem(e :any) : void
  {
    let droppedObject = e.dragData;
    console.log("Data gedroppt");
    console.log(typeof(droppedObject));

    if (droppedObject.hasOwnProperty('skills') )
    {
      if(!this.constructionAreaDay.employeeList.includes(droppedObject)) {
        this.constructionAreaDay.employeeList.push(droppedObject);
        this.resourceService.addEmployeeToArea(droppedObject, this.constructionArea.id, this.date, false);
      }

      console.log("mitarbeiter gedroppt");
    }
    if (droppedObject.hasOwnProperty('modell'))
    {
      if(!this.constructionAreaDay.vehicleList.includes(droppedObject)) {
        this.constructionAreaDay.vehicleList.push(droppedObject);
        this.resourceService.addVehicleToArea(droppedObject, this.constructionArea.id, this.date, false);
      }
      console.log("fahrzeug gedroppt");
    }
    if (droppedObject.hasOwnProperty('description'))
    {
      if(!this.constructionAreaDay.materialList.includes(droppedObject)) {
        this.constructionAreaDay.materialList.push(droppedObject);
        this.resourceService.addMaterialToArea(droppedObject, this.constructionArea.id, this.date, false);
      }
      console.log("material gedroppt");

    }
  }

  public removeMaterial(area : IConstructionArea, material : IMaterial): void {
    this.removeItemFromList(area.days[this.date].materialList, material);
    this.resourceService.removeMaterialFromArea(material, area.id, this.date, false);
  }

  public removeCar(area : IConstructionArea, car: IVehicle): void {
    this.removeItemFromList(area.days[this.date].vehicleList, car);
    this.resourceService.removeVehicleFromArea(car, area.id, this.date, false);
  }

  public removeEmployee(area : IConstructionArea, employee: IEmployee): void {
    this.removeItemFromList(area.days[this.date].employeeList, employee);
    this.resourceService.removeEmployeeFromArea(employee, area.id, this.date, false);
  }

  private removeItemFromList(list: any, item: any): void {
    if(list.includes(item)){
      list.forEach((x, index) => {
        if(item === x) list.splice(index, 1);
      });
    }
  }
}
