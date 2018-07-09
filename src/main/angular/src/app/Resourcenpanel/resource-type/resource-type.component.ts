import {Component, OnInit} from '@angular/core';
import {ResourceItem} from "../ResourceItem";
import {ResourceService} from "../resource.service";
import {IEmployee} from "../IEmployee";
import {IResource} from "../IResource";
import {IVehicle} from "../IVehicle";
import {IConstructionArea, IConstructionAreaDay} from "../IConstructionArea";
import {IConstructionLadder} from "../IConstructionLadder";
import {IMaterial} from "../IMaterial";
import {ActivatedRoute} from "@angular/router";
import {EmployeeResolver} from "./resource-type-resolver.service";

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {

  public employees :IEmployee[];
  public resources: IResource[];
  public vehicles: IVehicle[];
  public materials: IMaterial[];
  public constructionAreas : IConstructionArea[];
  public permanent: IConstructionArea[];

  public items: ResourceItem[];

  constructor(private route:ActivatedRoute) {
  }



  ngOnInit() {
    //get all employees, vehicles and materials

    this.constructionAreas = this.route.snapshot.data['constructionAreas'];
    this.permanent = this.route.snapshot.data['permanent'];
    debugger;
    this.employees = this.route.snapshot.data['employees']
    this.vehicles = this.route.snapshot.data['vehicles'];
    this.materials = this.route.snapshot.data['materials'];
    this.filterUnusedResources();
  }

  refreshResources(){
    //debugger;
    this.constructionAreas = this.route.snapshot.data['constructionAreas'];
    this.permanent = this.route.snapshot.data['permanent'];
    //debugger;
    this.employees = this.route.snapshot.data['employees'];
    this.vehicles = this.route.snapshot.data['vehicles'];
    this.materials = this.route.snapshot.data['materials'];
    this.filterUnusedResources();
  }

  //delete all employees from the employee array which are used in a constructionArea
  filterUnusedResources(){
    //Permanente resourcen filtern
    this.permanent.forEach(area =>{

      if(area.state === 'Aktiv'){
        //Alle Tage für die Baustellen holen, ist eine Liste von Keys(bspw: 2018-07-02)
        let dates = area.days;

        for(var date in dates){
          // für jedes Datum wird extra funktion aufgerufen
          this.cleanUpDayArray(date, area);
        }
      }

    });

    //Durch die Baustellenliste iterieren für die Woche
    this.constructionAreas.forEach(area =>{
      if(area.state === 'Aktiv'){

        //Alle Tage für die Baustellen holen, ist eine Liste von Keys(bspw: 2018-07-02)
        let dates = area.days;

        for(var date in dates){
          // für jedes Datum wird extra funktion aufgerufen
          this.cleanUpDayArray(date, area);
        }
      }

    });


  }
  //Durch diese funktino kann man auf die Liste, welche sich hinter dem DateKey verbirgt zugreifen
  cleanUpDayArray(date:string,area:IConstructionArea){
    //die Arrays für dieses Datum werden geholt
    let daysArray = area.days[date];
    //entfernt alle einträge in der gesamenten EmployeeListe, weil sie schon genutzt werden
    if(daysArray.employeeList.length !== 0){
      //über die benutzten resourcen an einem tag drüber iterieren und löschfunktion aufrufen
      daysArray.employeeList.forEach(employee =>
      {
        this.deleteEmployeeFromList(employee);
      });
    }

    if(daysArray.vehicleList.length !== 0){
      //über die benutzten resourcnen an einem tag drüber iterieren und löschfunktion aufrufen
      daysArray.vehicleList.forEach(vehicle =>
      {
        this.deleteVehicleFromList(vehicle);
      });
    }

    if(daysArray.materialList.length !== 0){
      //über die benutzten resourcen an einem tag drüber iterieren und löschfunktion aufrufen
      daysArray.materialList.forEach(material =>
      {
        this.deleteMaterialFromList(material);
      });
    }

  }


  deleteEmployeeFromList(employe){

    //entfernt aus der employee gesamtliste denjenigen employee, welcher schon an einem tag eingsetzt ist

    for(var _i = 0; _i < this.employees.length; _i++){
      if(this.employees[_i].lastName === employe.lastName && this.employees[_i].firstName === employe.firstName){
        this.employees.splice(_i,1);
      }
    }
  }
  //entfernt aus der vehicle gesamtliste denjenige vehicle, welche schon an einem tag eingesetzt ist
  deleteVehicleFromList(veh){
    for(var _i = 0; _i < this.vehicles.length; _i++){
      if(this.vehicles[_i].bezeichnung === veh.bezeichnung){
        this.vehicles.splice(_i,1);
      }
    }
  }

  //entfernt aus der material gesamtliste diejenige material, welche schon an einem tag eingesetzt ist
  deleteMaterialFromList(mat){
    for(var _i = 0; _i < this.materials.length; _i++){
      if(this.materials[_i].bezeichnung === mat.bezeichnung){
        this.materials.splice(_i,1);
      }
    }
  }

}

