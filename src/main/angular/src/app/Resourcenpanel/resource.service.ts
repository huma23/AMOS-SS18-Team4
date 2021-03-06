import { Injectable} from "@angular/core";
import {HttpErrorResponse, HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IEmployee} from "./IEmployee";
import {IResource} from "./IResource";
import 'rxjs/Rx';
import {IVehicle} from "./IVehicle";
import {IConstructionArea} from "./IConstructionArea";
import {IConstructionLadder} from "./IConstructionLadder";
import {IMaterial} from "./IMaterial";
import {Employee} from "../../model/employee";
import {Vehicle} from "../../model/vehicle";
import {Material} from "../../model/material";
import {ConstructionArea} from "../../model/constructionArea";
import {ConstructionLadder} from "../../model/constructionLadder";
import {ConstructionAreaForm} from "../../model/constructionAreaForm";
import {ICustomer} from "./ICustomer";
import {Customer} from "../../model/customer";
import {Reservation} from "../../model/Reservation";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ResourceService{

  private _employeeUri: string = "/api/employee";
  private _vehicleUri: string = "/api/vehicle";
  private _materialUri: string = "/api/material";
  private _constructionAreaUri: string = "/api/constructionArea";
  private _constructionLadderUri: string = "/api/constructionLadder"
  private _constructionAreaPermanentUri: string = "/api/constructionArea/permanent";
  private _customerUri: string ="/api/customer";

  constructor(private http: HttpClient){

  }

  //Mitarbeiter REST Service Requests
  getEmployees():Observable<IEmployee[]>{
    return this.http.get<Employee[]>(this._employeeUri);
  }

  getEmployeesWithinWeek(year, week):Observable<IEmployee[]>{
    return this.http.get<Employee[]>(this._employeeUri+ "/" + year + "/" + week);
  }

  saveEmployee(employee:any):Observable<Employee>{
    let body = JSON.stringify(employee);
    return this.http.post<Employee>(this._employeeUri, body, httpOptions).do(data => console.log(data));

  }

  //Fahrzeug REST Service Requests
  getVehicle():Observable<IVehicle[]>{
    return this.http.get<IVehicle[]>(this._vehicleUri);
  }

  getVehiclesWithinWeek(year, week):Observable<IVehicle[]>{
    return this.http.get<Vehicle[]>(this._vehicleUri + "/" + year + "/" + week);
  }

  saveVehicle(vehicle:any):Observable<IVehicle> {
    let body = JSON.stringify(vehicle)
    return this.http.post<Vehicle>(this._vehicleUri, body, httpOptions);
  }

  //Betriebsmittel REST Service Requests
  getMaterials():Observable<IMaterial[]>{
    return this.http.get<IMaterial[]>(this._materialUri);
  }

  getMaterialsWithinWeek(year, week):Observable<IMaterial[]>{
    return this.http.get<Material[]>(this._materialUri+ "/" + year+ "/" + week);
  }

  saveMaterials(material:any):Observable<IMaterial>{
    let body = JSON.stringify(material);
    return this.http.post<Material>(this._materialUri, body, httpOptions);
  }

  //Baustelle REST Service Requests
  getConstructionAreas():Observable<IConstructionArea[]>{
    return this.http.get<IConstructionArea[]>(this._constructionAreaUri);
  }

  saveConstructionArea(construction:ConstructionArea):Observable<IConstructionArea>{
    let body = JSON.stringify(construction);
    return this.http.post<IConstructionArea>(this._constructionAreaUri, body, httpOptions);
  }

  saveConstructionAreaForm(construction:ConstructionAreaForm){
    let body = JSON.stringify(construction);
    return this.http.post<ConstructionAreaForm>(this._constructionAreaUri, body, httpOptions);
  }

  getConstructionAreasPermanent():Observable<IConstructionArea[]>{
    return this.http.get<IConstructionArea[]>(this._constructionAreaPermanentUri);
  }
  //Bauleiter REST Service Requests
  getConstructionLadder():Observable<IConstructionLadder[]>{
    return this.http.get<IConstructionLadder[]>(this._constructionLadderUri);
  }

  saveConstructionLadder(constructionLadder:ConstructionLadder):Observable<IConstructionLadder>{
    let body = JSON.stringify(constructionLadder);
    return this.http.post<ConstructionLadder>(this._constructionLadderUri, body, httpOptions);
  }

  //Kunden REST Service Requests
  getCustomer():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this._customerUri);
  }

  saveCustomer(customer: Customer):Observable<ICustomer>{
    let body = JSON.stringify(customer);
    return this.http.post<Customer>(this._customerUri, body, httpOptions);
  }

  saveReservation(res:Reservation, constructionAreaId, date):Observable<Reservation>{
    debugger;
    let body = JSON.stringify(res);
    return this.http.post<Reservation>("/api/constructionArea/"+constructionAreaId+"/addReservation/"+date, body, httpOptions).do(data => console.log(data));

  }

}
