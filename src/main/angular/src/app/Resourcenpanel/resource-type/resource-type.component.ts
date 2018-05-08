import {Component, OnInit} from '@angular/core';
import {ResourceItem} from "../ResourceItem";
import {ResourceService} from "../resource.service";
import {IEmployee} from "../IEmployee";
import {IResource} from "../IResource";
import {IVehicle} from "../IVehicle";
import {IConstructionArea} from "../IConstructionArea";
import {IConstructionLadder} from "../IConstructionLadder";
import {IMaterial} from "../IMaterial";

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {

  public employees :IEmployee[];
  public resources: IResource[];
  public vehicles: IVehicle[];
  public materials: IMaterial[];

  public items: ResourceItem[];

  constructor( private _resourceService: ResourceService) {
  }



  ngOnInit() {
    this._resourceService.getEmployees()
      .subscribe(data => this.employees = data);
    this._resourceService.getVehicle()
      .subscribe(data=>this.vehicles = data);
    this._resourceService.getMaterials()
      .subscribe(data=>this.materials= data);
  }

}

