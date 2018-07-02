import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer";
import {ConstructionArea} from "../../../model/constructionArea";
import {ProgressType} from "../../../model/ProgressType";
import {IConstructionArea} from "../../Resourcenpanel/IConstructionArea";
import {ResourceService} from "../../Resourcenpanel/resource.service";

@Component({
  selector: 'pl-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  states: any;
  selectedState: any;
  edit: boolean = false;

  @Input()
  public constructionArea: IConstructionArea;

  constructor(private _resourceservice: ResourceService) { }

  ngOnInit() {
    this.states = ProgressType.values();
  }

  toggleEdit(){
    if(this.edit == true){
      debugger;
      this.edit = false;
      this.constructionArea.state = this.selectedState;
      this._resourceservice.saveConstructionArea(this.constructionArea).subscribe((res:ConstructionArea) => console.log(res));
    }
    else {
      this.edit = true;
    }
  }
}
