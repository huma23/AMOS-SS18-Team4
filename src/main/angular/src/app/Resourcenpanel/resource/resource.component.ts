import {Component, Input, OnInit} from '@angular/core';
import {IEmployee} from "../IEmployee";
import {IVehicle} from "../IVehicle";
import {IMaterial} from "../IMaterial";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public employeeList: IEmployee[];
  @Input()
  public vehicleList:IVehicle[];
  @Input()
  public materialList:IMaterial[];

}
