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

import { Component, Input, OnInit} from "@angular/core";
import { IConstructionArea, IConstructionAreaDay} from "../../Resourcenpanel/IConstructionArea";
import { Employee }           from "../../../model/employee";
import { Vehicle }            from "../../../model/vehicle";
import { Material }           from "../../../model/material";
import { IEmployee}           from "../../Resourcenpanel/IEmployee";
import { IVehicle}            from "../../Resourcenpanel/IVehicle";
import { IMaterial}           from "../../Resourcenpanel/IMaterial";
import { AddResourceService } from "../../services/add-resource.service";
import { DoubleDropRessourceComponent } from "../double-drop-ressource/double-drop-ressource.component";

//Material Stuff
import { MatDialog } from '@angular/material';

import {Observable}
from 'rxjs/Observable';
import { DropEvent } from "ng-drag-drop";
import { element } from "protractor";
import {DetailDialogComponent} from "../detail-dialog/detail-dialog.component";
import { ConstructionArea } from "../../../model/constructionArea";


enum RessourceType
{
    Mitarbeiter,
    Fahrzeug,
    Material
};



@Component({
  selector: 'pl-calender-construction-area',
  templateUrl: './calender-construction-area.component.html',
  styleUrls: ['./calender-construction-area.component.css']
})

/**
 *
 * @class CalenderConstructionAreaComponent
 *
 * Die Klasse CalenderConstructionAreaComponent ist für die Logik und den Inhalt einer einzelnen
 *
 * @see (central).Readme
 *
 *
 *
 */

export class CalenderConstructionAreaComponent implements OnInit
{

  @Input()
  public constructionArea : IConstructionArea;

  @Input()
  public  date : string;

  @Input()
  public allAreasofThisDay    : IConstructionArea[];

  public constructionAreaDay  : IConstructionAreaDay;

  private resourceService     : AddResourceService;

  constructor(_resService: AddResourceService, public dialog: MatDialog)
  {
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
/**
   * @method
   * hasEmployees
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   *
   *
   *
   */
  public hasEmployees() : boolean
  {
    if (this.constructionAreaDay.employeeList === null || this.constructionAreaDay.employeeList === undefined)
      return false;

    return true;
  }

  /**
   * @method
   * hasVehicles
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   *
   *
   *
   */
  public hasVehicles() : boolean
  {
    if (this.constructionAreaDay.vehicleList === null || this.constructionAreaDay.vehicleList === undefined)
      return false;

    return true;
  }

 /**
   * @method
   * hasMaterials
   *
   * @param
   * none
   *
   * @return
   * boolean
   *
   * @description
   *
   *
   *
   */
  public hasMaterials() : boolean
  {
    if (this.constructionAreaDay.materialList === null || this.constructionAreaDay.materialList === undefined)
      return false;

    return true;
  }
  /**
   * @method
   * onDropItem
   *
   * @param
   * droppedEvent : any
   *
   *
   * @return
   * void
   *
   * @description
   *
   *
   *
   */
  public onDropItem(droppedEvent : any) : void
  {
    let resstype : RessourceType;

    let droppedObject = droppedEvent.dragData;

    let newRessource = this.convertDragnDropObjectToRessource(droppedObject);

    let doubleUsedRessource : ConstructionArea;
    let startDialog: boolean ;

      if( newRessource instanceof Employee )
      {
        if (!this.checkIfRessourceAlreadyWithinProject(RessourceType.Mitarbeiter, newRessource))
        {
          doubleUsedRessource = this.checkIfRessourceIsDoubleUsed(RessourceType.Mitarbeiter,newRessource);
          if(doubleUsedRessource != null)
          {
            console.log(doubleUsedRessource);
            console.log(this.constructionArea);

            this.dialogIfDropDoubleRessource(RessourceType.Mitarbeiter, newRessource, this.constructionArea, doubleUsedRessource, this.date)
            .subscribe((dialogAnswer : boolean) =>
            {
              if(dialogAnswer)
              {

                this.addRessourceToLists(RessourceType.Mitarbeiter, newRessource);
              }
            });
          }
          else
          {
            this.addRessourceToLists(RessourceType.Mitarbeiter, newRessource);
          }
        }
      }
      else if ( newRessource instanceof Material)
      {
        if (!this.checkIfRessourceAlreadyWithinProject(RessourceType.Material, newRessource))
        {
          doubleUsedRessource = this.checkIfRessourceIsDoubleUsed(RessourceType.Material,newRessource);
          if(doubleUsedRessource != null)
          {
            console.log(doubleUsedRessource);
            this.dialogIfDropDoubleRessource(RessourceType.Material, newRessource, this.constructionArea, doubleUsedRessource,this.date)
            .subscribe((dialogAnswer : boolean) =>
            {
              if(dialogAnswer)
              {
                this.addRessourceToLists(RessourceType.Material, newRessource);
              }
            });
          }
          else
          {
            this.addRessourceToLists(RessourceType.Material, newRessource);
          }
        }
      }
      else if (newRessource instanceof Vehicle)
      {
        if (!this.checkIfRessourceAlreadyWithinProject(RessourceType.Fahrzeug, newRessource))
        {
          doubleUsedRessource = this.checkIfRessourceIsDoubleUsed(RessourceType.Fahrzeug,newRessource);
          if(doubleUsedRessource != null)
          {
            console.log(doubleUsedRessource);
            this.dialogIfDropDoubleRessource(RessourceType.Fahrzeug, newRessource,this.constructionArea, doubleUsedRessource, this.date)
            .subscribe((dialogAnswer : boolean) =>
            {
              if(dialogAnswer)
              {
                this.addRessourceToLists(RessourceType.Fahrzeug, newRessource);
              }
            });
          }
          else
          {
            this.addRessourceToLists(RessourceType.Fahrzeug, newRessource);
          }
        }
      }
  }



/**
   * @method
   * removeMaterial
   *
   * @param
   * area     :  IConstructionArea
   * material :  IMaterial
   *
   * @return
   * void
   *
   * @description

   *
   *
   */
  public removeMaterial(area : IConstructionArea, material : IMaterial): void {
    this.removeItemFromList(this.constructionAreaDay.materialList, material);
    this.resourceService.removeMaterialFromArea(material, area.id, this.date, false);
  }
/**
   * @method
   * removeCar
   *
   * @param
   * area : IConstructionArea
   * car  : IVehicle
   *
   *
   * @return
   * void
   *
   * @description
   *
   *
   */
  public removeCar(area : IConstructionArea, car: IVehicle): void {
    this.removeItemFromList(this.constructionAreaDay.vehicleList, car);
    this.resourceService.removeVehicleFromArea(car, area.id, this.date, false);
  }
/**
   * @method
   * removeEmployee
   *
   *
   *
   * @param
   * area     : IConstructionArea
   * employee : IEmployee
   *
   *
   *
   * @return
   * void
   *
   *
   *
   * @description
   *
   *
   *
   */
  public removeEmployee(area : IConstructionArea, employee: IEmployee): void
  {
    this.removeItemFromList(this.constructionAreaDay.employeeList, employee);
    this.resourceService.removeEmployeeFromArea(employee, area.id, this.date, false);
  }


/**
   * @method
   * removeItemFromList
   *
   * @param
   * list   :  any
   * item   :  any
   *
   * @return
   * void
   *
   * @description
   *
   *
   *
   *
   */
  private removeItemFromList(list: any, item: any): void
  {
    if(list.includes(item))
    {
      list.forEach((x, index) =>
      {
        if(item === x) list.splice(index, 1);
      });
    }
  }
/**
   * @method
   * addRessourceToLists
   *
   * @param
   * type       :  RessourceType
   * ressource  :  any
   *
   * @return
   * void
   *
   * @description
   *
   *
   *
   */
  private addRessourceToLists(type : RessourceType, ressource : any) : void
  {
    switch (type)
    {
      case RessourceType.Material:
        this.constructionAreaDay.materialList.push(ressource);
        this.resourceService.addMaterialToArea(ressource, this.constructionArea.id, this.date, false);
      break;
      case RessourceType.Fahrzeug:
        this.constructionAreaDay.vehicleList.push(ressource);
        this.resourceService.addVehicleToArea(ressource, this.constructionArea.id, this.date, false);
      break;
      case RessourceType.Mitarbeiter:
        this.constructionAreaDay.employeeList.push(ressource);
        this.resourceService.addEmployeeToArea(ressource, this.constructionArea.id, this.date, false);

      break;
    }
  }
  /**
   * @method
   * dialogIfDropDoubleRessource
   *
   * @param
   * type         : RessourceType
   * droppedItem  : any
   *
   * @return
   * Observable<any>
   *
   * @description
   *
   *
   *
   */
  private dialogIfDropDoubleRessource(type:RessourceType, droppedItem: any, actualProject: ConstructionArea, otherProject : ConstructionArea, date: string) : Observable<any>
  {
    let injectObject = {type, droppedItem, actualProject, otherProject, date};
   console.log(injectObject);
    let dialogRef = this.dialog.open(DoubleDropRessourceComponent,
    {
      maxHeight: '90%',
      maxWidth:'90%',
      data: injectObject,
      disableClose:false
    });

    return dialogRef.beforeClose();
  }


/**
   * @method
   * checkIfRessourceIsDoubleUsed
   *
   * @param
   * type      : RessourceType
   * ressource : any
   *
   * @return
   * boolean
   *
   * @description
   *
   *
   *
   *
   */
  private checkIfRessourceIsDoubleUsed(type : RessourceType, ressource : any) : (ConstructionArea | null)
  {
    let result : ConstructionArea = null
    ;

    this.allAreasofThisDay.forEach(singleArea =>
    {
      switch(type)
      {
        case RessourceType.Material:
        let foundMaterial =
        singleArea.days[this.date].materialList.filter((element : Material) =>
        {
          return ressource.equals(element);
        });
        if (foundMaterial.length > 0)
        result = singleArea;
        break;

        case RessourceType.Fahrzeug:
        let foundVehicel =
        singleArea.days[this.date].vehicleList.filter((element:Vehicle) =>
        {
          return ressource.equals(element);
        });

        if (foundVehicel.length > 0)
        result = singleArea;

        break;

        case RessourceType.Mitarbeiter:

        let foundEmpl =
        singleArea.days[this.date].employeeList.filter((element:Employee) =>
        {
          return ressource.equals(element);
        });

        if (foundEmpl.length > 0)
          result = singleArea;
        break;
      }

    });
    return result;
  }


  /**
  * @method
  * convertDragnDropObjectToRessource
  *
  * @param
  * dropObject : any
  *
  *
  *
  * @return
  * Employee | Material | Vehicle
  *
  *
  *
  *
  * @description
  *
  *
  *
  */

  private convertDragnDropObjectToRessource(dropObject : any) : Employee | Material | Vehicle
  {
    if (dropObject.hasOwnProperty('skills'))
    {
      return  new Employee(dropObject.firstName, dropObject.lastName,
        dropObject.age, dropObject.skills, dropObject.id);
    }
    else if (dropObject.hasOwnProperty('modell'))
    {
      return new  Vehicle(dropObject.bezeichnung,dropObject.size, dropObject.modell, dropObject.id);
    }
    else if (dropObject.hasOwnProperty('description'))
    {
      return new Material(dropObject.bezeichnung, dropObject.description, dropObject.location, dropObject.id);
    }
  }
 /**
  * @method
  * checkIfRessourceAlreadyWithinProject
  *
  *
  * @param
  * type      : RessourceType
  * ressource : any
  *
  *
  *
  * @return
  * boolean
  *
  *
  *
  * @description
  *
  *
  *
  */
  private checkIfRessourceAlreadyWithinProject(type: RessourceType, ressource : any) : boolean
  {
    let result;
    switch(type)
    {
      case RessourceType.Fahrzeug:
        result = this.constructionAreaDay.vehicleList.find(
          (element: Vehicle) => ressource.equals(element));
      break;

      case RessourceType.Material:
        result = this.constructionAreaDay.materialList.find(
          (element: Material) => ressource.equals(element));
      break;

      case RessourceType.Mitarbeiter:
        result = this.constructionAreaDay.employeeList.find(
          (element: Employee) => ressource.equals(element));
      break;
    }
    if (result === undefined || result === null)
      return false;

    return true;
  }
  /**
   * @method
   * openDetailDialog
   *
   *
   * @param
   * none
   *
   *
   *
   * @return
   * none
   *
   *
   *
   * @description
   *
   *
   *
   */
  openDetailDialog(): void {
      this.dialog.open(DetailDialogComponent, {
      height: '90%',
      width:'90%',
      data: {
        constructionArea: this.constructionArea,
        employeeList: this.constructionAreaDay.employeeList,
        vehicleList: this.constructionAreaDay.vehicleList,
        materialList: this.constructionAreaDay.materialList
      }
    });
  }

  testCalcTime(data:(Employee | Material | Vehicle)) : void
  {
    if (data instanceof Employee)
      console.log("TimeCalc on Employee");

      if (data instanceof Vehicle)
      console.log("TimeCalc on Vehicle");

      if (data instanceof Material)
      console.log("TimeCalc on Material");

      console.log("Data Dropped : " + data);
      console.log(data);
      console.log(Employee.toString());
      console.log(JSON.stringify(Employee));

  }
}
