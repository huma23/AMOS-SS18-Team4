import {ConstructionLadder} from "../../model/constructionLadder";
import {Employee} from "../../model/employee";

export interface IConstructionArea{
  name:string,
  startDate: string,
  endDate: string,
  bauleiter: ConstructionLadder,
  permanent: boolean
  employees: Employee[]
}
