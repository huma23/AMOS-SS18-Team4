import {IEmployee} from "../app/Resourcenpanel/IEmployee";

export class Employee implements IEmployee
{

  constructor(public firstName:string, public lastName:string, public age:number, public skills:string[]){  }

}
