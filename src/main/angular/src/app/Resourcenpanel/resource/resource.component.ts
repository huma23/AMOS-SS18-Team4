import {Component, Input, OnInit} from '@angular/core';
import {IEmployee} from "../IEmployee";
import {IVehicle} from "../IVehicle";
import {IMaterial} from "../IMaterial";
import {IConstructionArea} from "../IConstructionArea";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  @Input()
  public employeeList : IEmployee[];
  @Input()
  public vehicleList  : IVehicle[];
  @Input()
  public materialList : IMaterial[];
  @Input()
  public constructionAreaList:IConstructionArea[];

  constructor() { }

  ngOnInit() {
  }

  public onDropMitarbeiter(e:any) : void
  {
    this.employeeList.push(e.dragData);
  }

  public onDropBetriebsmittel (e:any) : void
  {
    this.materialList.push(e.dragData);
  }

  public onDropFahrzeug (e:any) : void 
  {
    this.vehicleList.push(e.dragData);
  }


}
