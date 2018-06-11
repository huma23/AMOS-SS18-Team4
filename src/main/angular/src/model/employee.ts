import {IEmployee} from "../app/Resourcenpanel/IEmployee";

export class Employee implements IEmployee
{

  constructor(public firstName:string, public lastName:string, public age:number, public skills:string[]){  }

  public equals(other : Employee) : boolean
  {
    return ((this.firstName === other.firstName)
    && (this.lastName === other.lastName) 
    && (this.skills.length === other.skills.length))
  }
}
