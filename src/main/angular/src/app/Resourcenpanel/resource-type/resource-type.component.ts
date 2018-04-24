import {Component, Input, OnInit} from '@angular/core';
import {ResourceItem} from "../ResourceItem";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {

  @Input()
  public items: ResourceItem[];


  constructor() {
    this.items = [
                new ResourceItem("Mitarbeiter", ["MA1", "MA2"]),
                new ResourceItem("Fahrzeug", ["Fahrzeug1", "Fahrzeug2"]) ]
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
  }

}

