import {ConstructionLadder} from "../../model/constructionLadder";
import {Employee} from "../../model/employee";
import {Vehicle} from "../../model/vehicle";
import {Material} from "../../model/material";
import {Customer} from "../../model/customer";

export interface IConstructionArea{
  id: string,
  name:string,
  startDate: string,
  endDate: string,
  bauleiter: ConstructionLadder,
  permanent: boolean,
  customer: Customer,
  days: {
    [key: string] : IConstructionAreaDay
  },
  attachments: IFileInfo[]
}

export interface IConstructionAreaDay{
  employeeList: Employee[],
  vehicleList: Vehicle[],
  materialList: Material[]
}

export interface IFileInfo {
  id: string,
  name: string,
  date: string
}
