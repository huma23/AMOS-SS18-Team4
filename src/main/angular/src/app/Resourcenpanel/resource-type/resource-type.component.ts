import {Component, Input, OnInit} from '@angular/core';
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
  public constructionAreas: IConstructionArea[];
  public constructionLadders: IConstructionLadder[];
  public materials: IMaterial[];

  public items: ResourceItem[];


  constructor(private _resourceService: ResourceService) {

  }

  addResourceType(restype, res){
      console.log(this.items.some(x => x.ResourceType === restype));
      if(this.items.some(x => x.ResourceType === restype))
      {
        this.items.forEach((item) => {
          if (item.ResourceType == restype)
            item.Resources.push(res)
        })
      }
      else{
        this.items.push(new ResourceItem(restype, [res]))
      }


  }
  ngOnInit() {
    this._resourceService.getEmployees()
      .subscribe(data => this.employees = data);
    this._resourceService.getResources()
      .subscribe(data => this.resources = data);
    this._resourceService.getCars()
      .subscribe(data=>this.vehicles = data);
    this._resourceService.getConstrunctionAreas()
      .subscribe(data=>this.constructionAreas = data);
    this._resourceService.getConstructionLadder()
      .subscribe(data=>this.constructionLadders = data);
    this._resourceService.getMaterials()
      .subscribe(data=>this.materials= data);
  }

}

