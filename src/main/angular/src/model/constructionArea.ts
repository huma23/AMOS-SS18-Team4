import {IConstructionArea} from "../app/Resourcenpanel/IConstructionArea";
import {ConstructionLadder} from "./constructionLadder";
import {Employee} from "./employee";
import {Vehicle} from "./vehicle";

export class ConstructionArea implements IConstructionArea{

  constructor(public name:string,
              public startDate:string,
              public endDate:string,
              public bauleiter: ConstructionLadder,
              public permanent: boolean,
              public employees:Employee[],
              public vehicles:Vehicle[]){}
}
