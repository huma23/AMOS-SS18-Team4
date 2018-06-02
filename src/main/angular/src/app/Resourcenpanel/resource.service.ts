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

  constructor(private http: HttpClient){

  }

  //Mitarbeiter
  getEmployees():Observable<IEmployee[]>{
    return this.http.get<Employee[]>(this._employeeUri);
  }

  saveEmployee(employee:Employee):Observable<Employee>{
    let body = JSON.stringify(employee);
    return this.http.post<Employee>(this._employeeUri, body, httpOptions).do(data => console.log(data));

  }

  //Fahrzeug
  getVehicle():Observable<IVehicle[]>{
    return this.http.get<IVehicle[]>(this._vehicleUri);
  }

  saveVehicle(vehicle:Vehicle):Observable<IVehicle> {
    let body = JSON.stringify(vehicle)
    return this.http.post<Vehicle>(this._vehicleUri, body, httpOptions);
  }

  //Betriebsmittel
  getMaterials():Observable<IMaterial[]>{
    return this.http.get<IMaterial[]>(this._materialUri);
  }

  saveMaterials(material:Material):Observable<IMaterial>{
    let body = JSON.stringify(material);
    return this.http.post<Material>(this._materialUri, body, httpOptions);
  }

  //Baustelle
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
  //Bauleiter
  getConstructionLadder():Observable<IConstructionLadder[]>{
    return this.http.get<IConstructionLadder[]>(this._constructionLadderUri);
  }

  saveConstructionLadder(constructionLadder:ConstructionLadder):Observable<IConstructionLadder>{
    let body = JSON.stringify(constructionLadder);
    return this.http.post<ConstructionLadder>(this._constructionLadderUri, body, httpOptions);
  }

}
