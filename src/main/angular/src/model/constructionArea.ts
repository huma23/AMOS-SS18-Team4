import {IConstructionArea, IConstructionAreaDay} from "../app/Resourcenpanel/IConstructionArea";
import {ConstructionLadder} from "./constructionLadder";
import {Employee} from "./employee";
import {Vehicle} from "./vehicle";
import {Material} from "./material";
import {Customer} from "./customer";

export class ConstructionArea implements IConstructionArea{

  constructor(
              public id: string,
              public name:string,
              public strasse:string,
              public ort: string,
              public plz:string,
              public startDate:string,
              public endDate:string,
              public bauleiter: ConstructionLadder,
              public permanent: boolean,
              public customer: Customer,
              public days: {
                [key: string] : IConstructionAreaDay
              }){}
}
