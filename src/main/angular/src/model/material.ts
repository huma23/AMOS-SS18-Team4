import {IMaterial} from "../app/Resourcenpanel/IMaterial";

export class Material implements IMaterial{

  constructor(public bezeichnung:string, public description:string, public location:string){

  }
}
