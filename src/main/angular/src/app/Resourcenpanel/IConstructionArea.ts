import {ConstructionLadder} from "../../model/constructionLadder";
import {Employee} from "../../model/employee";
import {Vehicle} from "../../model/vehicle";
import {Material} from "../../model/material";

export interface IConstructionArea{
  id: string,
  name:string,
  startDate: string,
  endDate: string,
  bauleiter: ConstructionLadder,
  permanent: boolean
  days: {
    [key: string] : IConstructionAreaDay
  }
}

export interface IConstructionAreaDay{
  employees: Employee[],
  vehicles: Vehicle[],
  materials: Material[]
}
