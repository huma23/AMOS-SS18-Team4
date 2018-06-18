import {Component, Input, OnInit} from '@angular/core';
import {IConstructionArea} from "../../Resourcenpanel/IConstructionArea";




@Component({
  selector: 'pl-detail-dialog-info',
  templateUrl: './detail-dialog-info.component.html',
  styleUrls: ['./detail-dialog-info.component.css']
})
export class DetailDialogInfoComponent implements OnInit {

  @Input()
  public constructionArea: IConstructionArea;

  constructor() {}

  ngOnInit() {
  }

}
