import {IVehicle} from "../app/Resourcenpanel/IVehicle";

export class Vehicle implements IVehicle{

  constructor(public id:number, public name:string, public size: string, public modell:string){

  }
}
