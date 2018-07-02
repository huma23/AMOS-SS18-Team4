import {Injectable} from "@angular/core";

@Injectable()
export class PlToolbarSharedService {

  public showLeft : boolean;
  public showRight  : boolean;

  constructor(){
    this.showRight = true;
    this.showLeft = true;
  }
}
