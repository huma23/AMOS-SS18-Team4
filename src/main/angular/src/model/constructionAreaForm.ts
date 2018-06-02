import {ConstructionLadder} from "./constructionLadder";

export class ConstructionAreaForm{

  constructor(
    public name:string,
    public startDate:string,
    public endDate:string,
    public bauleiter: ConstructionLadder,
    public permanent: boolean
  ){}
}
