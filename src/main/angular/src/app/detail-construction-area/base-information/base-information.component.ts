import { Component, OnInit, Input } from '@angular/core';
import { ConstructionArea } from '../../../model/constructionArea';
import * as moment from "moment";

@Component({
  selector: 'pl-base-information',
  templateUrl: './base-information.component.html',
  styleUrls: ['./base-information.component.css']
})
export class BaseInformationComponent implements OnInit {

  @Input()
  private constructionArea : ConstructionArea
  constructor() { }

  ngOnInit()
  {

  }
  getProjectTime() : string
  {
    return moment(this.constructionArea.startDate).format("DD.M.YYYY") + "-" + 
    moment(this.constructionArea.endDate).format("DD.M.YYYY")
  }

}
