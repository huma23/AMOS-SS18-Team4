import {IVehicle} from "../app/Resourcenpanel/IVehicle";

export class Vehicle implements IVehicle{

  constructor(public bezeichnung:string, public size: string, public modell:string){

  }
}
