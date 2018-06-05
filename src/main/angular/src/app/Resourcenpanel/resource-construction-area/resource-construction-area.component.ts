import {Component, Input, OnInit} from '@angular/core';
import {IConstructionArea, IConstructionAreaDay} from "../IConstructionArea";
import {Employee} from "../../../model/employee";
import {Vehicle} from "../../../model/vehicle";
import {Material} from "../../../model/material";
import {IMaterial} from "../IMaterial";
import {IVehicle} from "../IVehicle";
import {IEmployee} from "../IEmployee";
import {AddResourceService} from "../../services/add-resource.service";

@Component({
  selector: 'pl-resource-construction-area',
  templateUrl: './resource-construction-area.component.html',
  styleUrls: ['./resource-construction-area.component.css']
})
export class ResourceConstructionAreaComponent implements OnInit {

  @Input()
  public constructionAreaList:IConstructionArea[];

  private resourceService : AddResourceService;

  constructor(_resService: AddResourceService){
    this.resourceService = _resService;
  }

  ngOnInit() {
    for(let area of this.constructionAreaList){
      if (area.days[area.startDate].employeeList === (null|| undefined))
        area.days[area.startDate].employeeList = new Array<Employee>();

      if (area.days[area.startDate].materialList === (null || undefined))
        area.days[area.startDate].materialList = new Array<Material>();

      if (area.days[area.startDate].vehicleList === (null || undefined))
        area.days[area.startDate].vehicleList = new Array<Vehicle>();
    }
  }

  public onDropItem(e :any, area: IConstructionArea) : void
  {
    let droppedObject = e.dragData;

    if (droppedObject.hasOwnProperty('skills') )
    {
      if(!area.days[area.startDate].employeeList.includes(droppedObject)) {
        area.days[area.startDate].employeeList.push(droppedObject);
        this.resourceService.addEmployeeToArea(droppedObject, area.id, null, true);
      }

      console.log("mitarbeiter gedroppt");
    }
    if (droppedObject.hasOwnProperty('modell')) {
      if (!area.days[area.startDate].vehicleList.includes(droppedObject)) {
        area.days[area.startDate].vehicleList.push(droppedObject);
        this.resourceService.addVehicleToArea(droppedObject, area.id, null, true);
      }

      console.log("fahrzeug gedroppt");
    }
    if (droppedObject.hasOwnProperty('description'))
    {
      if(!area.days[area.startDate].materialList.includes(droppedObject)) {
        area.days[area.startDate].materialList.push(droppedObject);
        this.resourceService.addMaterialToArea(droppedObject, area.id, null, true);
      }
      console.log("material gedroppt");
    }
  }

  public removeMaterial(area : IConstructionArea, material : IMaterial): void {
    this.removeItemFromList(area.days[area.startDate].materialList, material);
    this.resourceService.removeMaterialFromArea(material, area.id, null, true);
  }

  public removeCar(area : IConstructionArea, car: IVehicle): void {
    this.removeItemFromList(area.days[area.startDate].vehicleList, car);
    this.resourceService.removeVehicleFromArea(car, area.id, null, true);
  }

  public removeEmployee(area : IConstructionArea, employee: IEmployee): void {
    this.removeItemFromList(area.days[area.startDate].employeeList, employee);
    this.resourceService.removeEmployeeFromArea(employee, area.id, null, true);
  }

  private removeItemFromList(list: any, item: any): void {
    if(list.includes(item)){
      list.forEach((x, index) => {
        if(item === x) list.splice(index, 1);
      });
    }
  }
}
