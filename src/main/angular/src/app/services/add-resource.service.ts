import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEmployee} from "../Resourcenpanel/IEmployee";
import {IMaterial} from "../Resourcenpanel/IMaterial";
import {BACKEND_URLS} from "../shared/backendUrls";
import {IVehicle} from "../Resourcenpanel/IVehicle";
import {INote}    from "../Resourcenpanel/INote";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddResourceService {

  private httpClient: HttpClient;

  constructor(_httpClient: HttpClient) {
    this.httpClient = _httpClient;
  }

  public removeEmployeeFromArea(empl: IEmployee, id: string, day: string, permanent: boolean):void{
    var data = this.createEmployeeData(empl, day, permanent);
    this.sendRemoveResourceData(data, id);
  }

  public removeVehicleFromArea(veh: IVehicle, id: string, day: string, permanent: boolean):void{
    var data = this.createVehicleData(veh, day, permanent);
    this.sendRemoveResourceData(data, id);
  }

  public removeMaterialFromArea(mat: IMaterial, id: string, day: string, permanent: boolean):void{
    var data = this.createMaterialData(mat, day, permanent);
    this.sendRemoveResourceData(data, id);
  }

  public addEmployeeToArea(empl: IEmployee, id: string, day: string, permanent: boolean):void{
    var data = this.createEmployeeData(empl, day, permanent);
    this.sendAddResourceData(data, id);
  }

  public addVehicleToArea(veh: IVehicle, id: string, day: string, permanent: boolean):void{
    var data = this.createVehicleData(veh, day, permanent);
    this.sendAddResourceData(data, id);
  }

  public addMaterialToArea(mat: IMaterial, id: string, day: string, permanent: boolean):void{
    var data = this.createMaterialData(mat, day, permanent);
    this.sendAddResourceData(data, id);
  }
  public addNoteToArea (note:INote, id:string) : void{
    let url = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + id + BACKEND_URLS.CONSTRUCTION_AREA_ADD_NOTE;
    this.send(note,url,id);
  }
  public changeProgressFromArea(id:string, progress:string)
  {
    let url = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + id + BACKEND_URLS.CONSTRUCTION_AREA_CH_PROGRESS;
    let data : any =  {};
    data.progress = progress;
    this.send(data, url,id);
  }

  private createEmployeeData(empl: IEmployee, day: string, permanent: boolean): any{
    var data : any = {};
    data.day = day;
    data.employee = empl;
    data.permanent = permanent;
    return data;
  }

  private createVehicleData(veh: IVehicle, day: string, permanent: boolean):any{
    var data : any = {};
    data.day = day;
    data.vehicle = veh;
    data.permanent = permanent;
    return data;
  }

  private createMaterialData(mat: IMaterial, day: string, permanent: boolean):void{
    var data : any = {};
    data.day = day;
    data.material = mat;
    data.permanent = permanent;
    return data;
  }

  private sendAddResourceData(data: any, id:string):void{
    let url = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + id + BACKEND_URLS.CONSTRUCTION_AREA_ADD_RESOURCE_PART;
    this.send(data, url, id);
  }

  private sendRemoveResourceData(data: any, id:string):void{
    let url = BACKEND_URLS.CONSTRUCTION_AREA_URL + "/" + id + BACKEND_URLS.CONSTRUCTION_AREA_REMOVE_RESOURCE_PART;
    this.send(data, url, id);
  }

  private send(data: any, url: string, id: string){
    let body = JSON.stringify(data);
    this.httpClient.post(url, body, httpOptions).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured!");
      }
    );
  }
}
