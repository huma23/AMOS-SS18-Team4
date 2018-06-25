import {Component, Input, OnInit} from '@angular/core';
import {IConstructionArea} from "../../Resourcenpanel/IConstructionArea";
import {ResourceService} from "../../Resourcenpanel/resource.service";
import {Customer} from "../../../model/customer";
import {ConstructionArea} from "../../../model/constructionArea";






@Component({
  selector: 'pl-detail-dialog-info',
  templateUrl: './detail-dialog-info.component.html',
  styleUrls: ['./detail-dialog-info.component.css']
})
export class DetailDialogInfoComponent implements OnInit {

  public edit: boolean = false;

   customer : Customer;

  @Input()
  public constructionArea: IConstructionArea;

  constructor(private _resourceservice: ResourceService) {
  }

  ngOnInit() {
    this.customer = this.constructionArea.customer;
  }

  toggleEdit(){
    if(this.edit == true){
      debugger;
      this.edit = false;
      this.constructionArea.customer = this.customer;
      this._resourceservice.saveCustomer(this.customer).subscribe((res:Customer)=>console.log(res));
      this._resourceservice.saveConstructionArea(this.constructionArea).subscribe((res:ConstructionArea) => console.log(res));
    }
    else {
      this.edit = true;
    }
  }
}
