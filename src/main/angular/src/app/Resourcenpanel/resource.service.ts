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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ResourceService{

  private _url: string = "/api/employee";
  private _url2: string = "/api/vehicle";
  private _url3: string = "/api/material";

  constructor(private http: HttpClient){

  }

  //Employee
  getEmployees():Observable<IEmployee[]>{
    return this.http.get<Employee[]>(this._url);
  }

  saveEmployee(employee:Employee):Observable<Employee>{
    let body = JSON.stringify(employee);
    return this.http.post<Employee>(this._url, body, httpOptions).do(data => console.log(data));

  }

  //Vehicle
  getVehicle():Observable<IVehicle[]>{
    return this.http.get<IVehicle[]>(this._url2);
  }

  saveVehicle(vehicle:Vehicle):Observable<IVehicle> {
    let body = JSON.stringify(vehicle)
    return this.http.post<Vehicle>(this._url2, body, httpOptions);
  }

  //Material
  getMaterials():Observable<IMaterial[]>{
    return this.http.get<IMaterial[]>(this._url3);
  }

  saveMaterials(material:Material):Observable<IMaterial>{
    let body = JSON.stringify(material);
    return this.http.post<Material>(this._url3, body, httpOptions);
  }




/*  //ConstructionArea
  getConstructionAreas():Observable<IConstructionArea[]>{
    return this.http.get<IConstructionArea[]>(this._url4);
  }

  //Constructionladder
  getConstructionLadder():Observable<IConstructionLadder[]>{
    return this.http.get<IConstructionLadder[]>(this._url5);
  }

  getResources():Observable<IResource[]>{
    return this.http.get<IResource[]>(this._url2)
  }*/

}
