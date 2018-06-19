import { Component, OnInit, Input } from '@angular/core';
import { ConstructionArea } from '../../../model/constructionArea';

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

}
