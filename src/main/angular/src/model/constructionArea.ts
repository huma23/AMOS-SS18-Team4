import {IConstructionArea} from "../app/Resourcenpanel/IConstructionArea";

export class ConstructionArea implements IConstructionArea{

  constructor(public name:string, public startDate:string, public endDate:string){}
}
