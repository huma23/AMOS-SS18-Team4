import {IMaterial} from "../app/Resourcenpanel/IMaterial";

export class Material implements IMaterial{

  constructor(public bezeichnung:string, public description:string, public location:string, public id:string){
  }

  public equals (other : Material)
  {
    return ((this.bezeichnung === other.bezeichnung)
            && (this.description === other.description)
            && (this.location === other.location))
  }
}
