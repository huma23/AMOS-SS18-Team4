import {ConstructionLadder} from "./constructionLadder";
import {Customer} from "./customer";

export class ConstructionAreaForm{

  constructor(
    public name:string,
    public startDate:string,
    public endDate:string,
    public strasse:string,
    public ort:string,
    public plz:string,
    public bauleiter: ConstructionLadder,
    public permanent: boolean,
    public customer: Customer
  ){}
}
