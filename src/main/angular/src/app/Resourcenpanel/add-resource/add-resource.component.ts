import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../model/employee";
import {ResourceService} from "../resource.service";

@Component({
  selector: 'pl-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  constructor(private _resourceService:ResourceService) { }

  ngOnInit() {
  }

  addEmployee(id,name,age,skills){
    let emp = new Employee(id,name,age,[skills]);
    console.log(emp +","+JSON.stringify(emp));
    this._resourceService.saveEmployee(emp).subscribe((res:Employee)=>console.log(res));
    // this.employees.push(emp);
  }

  // addVehicle(id,name,size,modell){
  //   let vehicle = new Vehicle(id,name,size,modell);
  //   console.log(emp +","+JSON.stringify(emp));
  //   this._resourceService.saveVehicle(emp).subscribe((res:Employee)=>console.log(res));
  //   // this.employees.push(emp);
  // }

}
