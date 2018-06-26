import { Component, OnInit, Input } from '@angular/core';
import { AddResourceService } from '../../services/add-resource.service';

@Component({
  selector: 'pl-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  public selectedValue: string = '0';


  @Input()
  public progressBarValue: string;

  @Input()
  public id;

  public progressBarValueNumeric : number;

  public  showEdit : boolean;
  private addRessService : AddResourceService;
  public  moeglicheWerte : Array<String>;

  constructor(_resService: AddResourceService)
  {
    this.addRessService = _resService;
    this.showEdit = false;

  }

  ngOnInit() {
    console.log(this.progressBarValue);
    this.progressBarValueNumeric = Number(this.progressBarValue);
    console.log(this.progressBarValueNumeric);

    this.moeglicheWerte = new Array<String>("0","25","50","75", "100");
  }
  public showEditView()
  {
    this.showEdit = true;
  }
  public changeProgressState():void
  {
    console.log("Neuer Wert: " + this.selectedValue);
    this.addRessService.changeProgressFromArea(this.id, this.selectedValue);
    this.progressBarValueNumeric = Number(this.selectedValue);
    this.showEdit=false;
  }
  public cancel() : void
  {
    this.showEdit = false;
  }
 

}
