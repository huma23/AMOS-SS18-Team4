import {IEmployee} from "../app/Resourcenpanel/IEmployee";

export class Employee implements IEmployee
{

  constructor(public id:number,public name:string, public age:number, public skills:string[]){

  }
}
