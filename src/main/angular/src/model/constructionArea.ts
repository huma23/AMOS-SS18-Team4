import {IConstructionArea} from "../app/Resourcenpanel/IConstructionArea";
import {ConstructionLadder} from "./constructionLadder";

export class ConstructionArea implements IConstructionArea{

  constructor(public name:string, public startDate:string, public endDate:string, public bauleiter: ConstructionLadder, public  permanent:boolean){}
}
