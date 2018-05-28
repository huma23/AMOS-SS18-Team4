import {Component, OnInit} from '@angular/core';
import {ResourceItem} from "../ResourceItem";
import {ResourceService} from "../resource.service";
import {IEmployee} from "../IEmployee";
import {IResource} from "../IResource";
import {IVehicle} from "../IVehicle";
import {IConstructionArea} from "../IConstructionArea";
import {IConstructionLadder} from "../IConstructionLadder";
import {IMaterial} from "../IMaterial";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private route:ActivatedRoute) {
  }



  ngOnInit() {
    this.employees = this.route.snapshot.data['employees'];
    this.vehicles = this.route.snapshot.data['vehicles'];
    this.materials = this.route.snapshot.data['materials'];
  }
}

