import {IVehicle} from "../app/Resourcenpanel/IVehicle";

export class Vehicle implements IVehicle{

  constructor(public bezeichnung:string, public size: string, public modell:string, public id:string){ }

  public equals(other : Vehicle)
  {
    return ((this.bezeichnung === other.bezeichnung)
    && (this.modell === other.modell)
    && (this.size === other.size))
  }
}
