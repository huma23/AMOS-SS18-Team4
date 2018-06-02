import {IConstructionArea, IConstructionAreaDay} from "../app/Resourcenpanel/IConstructionArea";
import {ConstructionLadder} from "./constructionLadder";
import {Employee} from "./employee";
import {Vehicle} from "./vehicle";
import {Material} from "./material";

export class ConstructionArea implements IConstructionArea{

  constructor(
              public id: string,
              public name:string,
              public startDate:string,
              public endDate:string,
              public bauleiter: ConstructionLadder,
              public permanent: boolean,
              public days: {
                [key: string] : IConstructionAreaDay
              }){}
}
