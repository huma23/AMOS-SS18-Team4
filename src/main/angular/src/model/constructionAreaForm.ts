import {ConstructionLadder} from "./constructionLadder";
import {Customer} from "./customer";
import {ProgressType} from "./ProgressType";
import {Note} from "./Note";


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
    public customer: Customer,
    public state: ProgressType,
    public notes: Note[],
    public progress:string
  ){}
}
