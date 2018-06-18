
import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../model/employee";
import {Customer} from "../../../model/customer";
import {ResourceService} from "../resource.service";
import {Vehicle} from "../../../model/vehicle";
import {Material} from "../../../model/material";
import {IConstructionArea} from "../IConstructionArea";
import {ConstructionArea} from "../../../model/constructionArea";
import {ConstructionLadder} from "../../../model/constructionLadder";
import {IConstructionLadder} from "../IConstructionLadder";
import {IEmployee} from "../IEmployee";
import {IVehicle} from "../IVehicle";
import {IMaterial} from "../IMaterial";
import * as moment from "moment";
import {ConstructionAreaForm} from "../../../model/constructionAreaForm";
import {ICustomer} from "../ICustomer";

@Component({
  selector: 'pl-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {


  constructions : IConstructionArea[];
  constructionLadders : IConstructionLadder[];
  employees: IEmployee[];
  vehicles: IVehicle[];
  materials: IMaterial[];
  customers: ICustomer[];





  formContent = new ConstructionAreaForm("", "", "", null, true, null);
  startDate:string;
  endDate:string;
  selectedBauleiter:ConstructionLadder;
  selectedCustomer: Customer;

  constructor(private _resourceService:ResourceService) {
  }



  onStartDate(event){
      this.startDate = event;
  }
  onEndDate(event){

      this.endDate = event;
  }


  ngOnInit() {
    debugger;
    this._resourceService.getConstructionAreas()
      .subscribe(data => this.constructions = data);
    this._resourceService.getConstructionLadder()
      .subscribe(data => this.constructionLadders = data);
    this._resourceService.getEmployees()
      .subscribe(data => this.employees = data);
    this._resourceService.getVehicle()
      .subscribe(data => this.vehicles = data);
    this._resourceService.getMaterials()
      .subscribe( data => this.materials = data);
    this._resourceService.getCustomer()
      .subscribe(data => this.customers = data);
  }

  //add "Mitarbeiter" through POST Request to the DB
  addEmployee(firstName,lastName,age,skills){
    let emp = new Employee(firstName,lastName,age,[skills]);
    console.log(emp +","+JSON.stringify(emp));
    this._resourceService.saveEmployee(emp).subscribe((res:Employee)=>console.log(res));

  }

  //add "Fahrzeug" through POST Request to the DB
  addVehicle(bezeichnung,size,modell){
    let vehicle = new Vehicle(bezeichnung,size,modell);
    console.log(vehicle +","+JSON.stringify(vehicle));
    this._resourceService.saveVehicle(vehicle).subscribe((res:Vehicle)=>console.log(res));

  }

  //add "Betriebsmittel" through POST Request to the DB
  addMaterial(bezeichnung,description,location){
    let material = new Material(bezeichnung,description,location);
    console.log(material +","+JSON.stringify(material));
    this._resourceService.saveMaterials(material).subscribe((res:Material)=>console.log(res));

  }


  //add "Baustelle" through POST Request to the DB
  //get the actual "Bauleiter" and saves it in the new "Baustelle" object
  addConstruction(form:ConstructionArea){
  debugger;
    this.formContent.startDate = moment(this.startDate).format("YYYY-MM-DD");
    this.formContent.endDate = moment(this.endDate).format("YYYY-MM-DD");


    let startdateobject = new Date(this.startDate);
    let endDateObject = new Date(this.endDate);
    let diff = endDateObject.getDate()- startdateobject.getDate();
    if(diff < 5){
      this.formContent.permanent = false;
    }

    this.formContent.bauleiter = this.selectedBauleiter;
    this.formContent.customer = this.selectedCustomer;

    JSON.stringify(this.formContent);
    this._resourceService.saveConstructionAreaForm(this.formContent).subscribe((res:ConstructionArea) => console.log(res));
  }

  //add "Bauleiter" through POST Request to the DB
  addConstructionLadder(firstName, lastName){
    let constructionLadder = new ConstructionLadder(firstName, lastName);
    console.log(constructionLadder+ ", "+ JSON.stringify(constructionLadder)+","+this.constructionLadders);
    this._resourceService.saveConstructionLadder(constructionLadder).subscribe((res:ConstructionLadder) => console.log(res));
  }

  addCustomer(firstName, lastName, street, houseNumber, postalCode, city, email, phoneNumber, mobilePhone){
    let customer = new Customer(firstName, lastName, street, houseNumber, postalCode, city, email, phoneNumber, mobilePhone)
    this._resourceService.saveCustomer(customer).subscribe((res:Customer) => console.log(res));
  }
}
