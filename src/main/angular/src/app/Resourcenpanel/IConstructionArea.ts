import {ConstructionLadder} from "../../model/constructionLadder";
import {Employee} from "../../model/employee";
import {Vehicle} from "../../model/vehicle";
import {Material} from "../../model/material";
import {Customer} from "../../model/customer";
import {ProgressType} from "../../model/ProgressType";
import {Note}         from "../../model/Note";
import {Reservation} from "../../model/Reservation";

export interface IConstructionArea{
  id: string,
  name:string,
  strasse:string,
  ort:string,
  plz:string,
  startDate: string,
  endDate: string,
  bauleiter: ConstructionLadder,
  permanent: boolean,
  customer: Customer,
  state: ProgressType,
  days: {
    [key: string] : IConstructionAreaDay
  },
  attachments: IFileInfo[],
  images: IFileInfo[],
  notes: Note[],
  progress : string
}

export interface IConstructionAreaDay{
  employeeList: Employee[],
  vehicleList: Vehicle[],
  materialList: Material[],
  reservations: Reservation[],
}

export interface IFileInfo {
  id: string,
  name: string,
  date: string
}
