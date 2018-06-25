/**
 *  @license
 *
 *
 * Copyright [2018] [(MAMB Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)]

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright (c) 2018 by MAMB (Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 *
 *
 */

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
