import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public resList: string[];

}
