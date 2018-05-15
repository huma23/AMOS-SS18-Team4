import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../model/employee";
import {ResourceService} from "../resource.service";
import {Vehicle} from "../../../model/vehicle";
import {Material} from "../../../model/material";
import {IConstructionArea} from "../IConstructionArea";
import {ConstructionArea} from "../../../model/constructionArea";

@Component({
  selector: 'pl-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {


  constructions : IConstructionArea[];

  constructor(private _resourceService:ResourceService) {
  }

  ngOnInit() {
    this._resourceService.getConstructionAreas()
      .subscribe(data => this.constructions = data);
  }

  addEmployee(firstName,lastName,age,skills){
    let emp = new Employee(firstName,lastName,age,[skills]);
    console.log(emp +","+JSON.stringify(emp));
    this._resourceService.saveEmployee(emp).subscribe((res:Employee)=>console.log(res));

  }

  addVehicle(bezeichnung,size,modell){
    let vehicle = new Vehicle(bezeichnung,size,modell);
    console.log(vehicle +","+JSON.stringify(vehicle));
    this._resourceService.saveVehicle(vehicle).subscribe((res:Vehicle)=>console.log(res));

  }

  addMaterial(bezeichnung,description,location){
    let material = new Material(bezeichnung,description,location);
    console.log(material +","+JSON.stringify(material));
    this._resourceService.saveMaterials(material).subscribe((res:Material)=>console.log(res));

  }

  addConstruction(name, startDate, endDate){
    let construction = new ConstructionArea(name, startDate, endDate);
    console.log(construction + ", "+ JSON.stringify(construction)+","+this.constructions);
    this._resourceService.saveConstructionArea(construction).subscribe((res:ConstructionArea) => console.log(res));

  }

}
