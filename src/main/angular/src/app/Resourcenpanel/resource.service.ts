import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IEmployee} from "./IEmployee";
import {IResource} from "./IResource";
import 'rxjs/Rx';
import {IVehicle} from "./IVehicle";
import {IConstructionArea} from "./IConstructionArea";
import {IConstructionLadder} from "./IConstructionLadder";
import {IMaterial} from "./IMaterial";



@Injectable()
export class ResourceService{

  private _url: string = "../assets/data/employees.json";
  private _url2: string = "../assets/data/resources.json";
  private _url3: string = "../assets/data/cars.json";
  private _url4: string = "../assets/data/constructionAreas.json";
  private _url5: string = "../assets/data/constructionLadders.json";
  private _url6: string = "../assets/data/materials.json";

  constructor(private http: HttpClient){

  }

  //Employee
  getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url);
  }

  //Vehicle
  getCars():Observable<IVehicle[]>{
    return this.http.get<IVehicle[]>(this._url3);
  }

  //ConstructionArea
  getConstrunctionAreas():Observable<IConstructionArea[]>{
    return this.http.get<IConstructionArea[]>(this._url4);
  }

  //Constructionladder
  getConstructionLadder():Observable<IConstructionLadder[]>{
    return this.http.get<IConstructionLadder[]>(this._url5);
  }


  //Material Resource
  getMaterials():Observable<IMaterial[]>{
    return this.http.get<IMaterial[]>(this._url6);
  }


  getResources():Observable<IResource[]>{
    return this.http.get<IResource[]>(this._url2)
  }
}
