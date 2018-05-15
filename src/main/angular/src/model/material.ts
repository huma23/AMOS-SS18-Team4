import {IMaterial} from "../app/Resourcenpanel/IMaterial";

export class Material implements IMaterial{

  constructor(public id:number, public name:string, public description:string, public location:string){

  }
}
