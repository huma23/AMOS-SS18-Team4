import {ICustomer} from "../app/Resourcenpanel/ICustomer";

export class Customer implements ICustomer{

  constructor(public firstName: string,
              public lastName: string,
              public street: string,
              public houseNumber: number,
              public postalCode: number,
              public city: string,
              public email: string,
              public phoneNumber: number,
              public mobilePhone: number){  }
}
