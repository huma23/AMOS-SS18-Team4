/**
 *  @license
 *
 *
 * Copyright [2018] [(MAMB Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)]

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright (c) 2018 by MAMB (Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 *
 *
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Validators,  FormBuilder, FormGroup }from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Employee} from "../../../model/employee";
import {Reservation} from "../../../model/Reservation";
import {ConstructionArea} from "../../../model/constructionArea";
import {ResourceService} from "../../Resourcenpanel/resource.service";

@Component({
  selector: 'pl-double-drop-ressource',
  templateUrl: './double-drop-ressource.component.html',
  styleUrls: ['./double-drop-ressource.component.css']
})

/**
 *
 * @class DoubleDropRessourceComponent
 *
 *
 *
 * @see (central).Readme
 *
 *
 *
 */
export class DoubleDropRessourceComponent
{
  public mitarbeiterString  : string = "Der ausgewählte Mitarbeiter";
  public vehicelString      : string = "Das ausgewählte Fahrzeug";
  public materialString     : string = "Das ausgewählte Betriebsmittel";

  public dialogText          : string;
  public dialogSpecificType  : string;

  public dialogTextMiddle : string = "wurde bereits dem Projekt:  ";
  public dialogTextEnding : string = " zugeordnet. Dennoch zuordnen\n?";

  public showScheduleRessoureTime : boolean = false;

  public hours    : Array<number>  = new Array( 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 );
  public minutes  : Array<number>  = new Array( 0,15,30,45);

  public actualConstructionArea: ConstructionArea;
  public otherConstructionArea: ConstructionArea;
  public id:string;


  public scheduleRessForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DoubleDropRessourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , public fb : FormBuilder, private _resourceservice: ResourceService)
    {
      debugger;

      switch (data.type)
      {
        case 0:
          this.dialogText         = this.mitarbeiterString;
          this.dialogSpecificType = data.droppedItem.firstName + " "+data.droppedItem.lastName ;
        break;
        case 1:
          this.dialogText         = this.vehicelString;
          this.dialogSpecificType = data.droppedItem.bezeichnung;
        break;
        case 2:
          this.dialogText         = this.materialString;
          this.dialogSpecificType = data.droppedItem.bezeichnung;
        break;
      }

      this.scheduleRessForm = this.fb.group({
        hoursFromAreaOne    : [0, Validators.required],
        minutesFromAreaOne  : [0, Validators.required],
        hoursToAreaOne      : [0, Validators.required],
        minutesToAreaOne    : [0, Validators.required],
        hoursFromAreaTwo    : [0, Validators.required],
        minutesFromAreaTwo  : [0, Validators.required],
        hoursToAreaTwo      : [0, Validators.required],
        minutesToAreaTwo    : [0, Validators.required]
      });
      this.actualConstructionArea = data.actualProject;
      this.otherConstructionArea = data.otherProject;
      this.id = data.droppedItem.id;

    }



  /**
   * @method
   * onCloseDialog
   *
   *
   *
   * @param
   * result : boolean
   *
   *
   * @return
   * void
   *
   * @description
   *
   *
   *
   */
    public showRessourceTimePlanSched() : void
    {
      this.showScheduleRessoureTime = true;
    }

/**
   * @method
   * onCloseDialog
   *
   *
   *
   * @param
   * result : boolean
   *
   *
   * @return
   * void
   *
   * @description
   *
   *
   *
   */

    public hoursFromArea2GreaterThanHoursToOne() : boolean
    {

      console.log("hoursFromArea2GreaterThanHoursToOne()");
      console.log(this.scheduleRessForm.get('hoursToAreaOne'));
      console.log(this.scheduleRessForm.get('hoursFromAreaTwo'));

      let hoursFromAreaOne = this.scheduleRessForm.get('hoursFromAreaOne').value;
      let hoursToAreaOne = this.scheduleRessForm.get('hoursToAreaOne').value;
      let hoursFromAreaTwo = this.scheduleRessForm.get('hoursFromAreaTwo').value;
      let hoursToAreaTwo = this.scheduleRessForm.get('hoursToAreaTwo').value;

      if(hoursToAreaOne === 0 && hoursFromAreaTwo === 0){
        return false;
      }
      //fromOne < toOne && toOne <= fromTwo && fromTwo < toTwo
      if((hoursFromAreaOne < hoursToAreaOne && hoursToAreaOne <= hoursFromAreaTwo && hoursFromAreaTwo < hoursToAreaTwo && hoursToAreaTwo > hoursToAreaOne) ||
        (hoursFromAreaOne < hoursToAreaOne && hoursToAreaOne >= hoursFromAreaTwo && hoursFromAreaTwo < hoursToAreaTwo && hoursToAreaTwo < hoursToAreaOne) )
      {
        return true;
      }
      else{
        return false;
      }
      // return this.scheduleRessForm.get('hoursToAreaOne') <=
      //   this.scheduleRessForm.get('hoursFromAreaTwo');
    }


    public onCloseDialog(result : boolean)
    {
      this.dialogRef.close(result);
    }
    public abortScheduleTimeRess(): void
    {
      this.dialogRef.close(false);
    }

    public onSubmit()
    {
      debugger;
      //aktuelles Projekt reservierung
      let startDateOne = this.scheduleRessForm.get('hoursFromAreaOne').value+':'+this.scheduleRessForm.get('minutesFromAreaOne').value;
      let endDateOne = this.scheduleRessForm.get('hoursToAreaOne').value +':'+this.scheduleRessForm.get('minutesToAreaOne').value;

      //aktuelles Projekt reservierung
      let startDateTwo = this.scheduleRessForm.get('hoursFromAreaTwo').value+':'+this.scheduleRessForm.get('minutesFromAreaTwo').value;
      let endDateTwo= this.scheduleRessForm.get('hoursToAreaTwo').value +':'+this.scheduleRessForm.get('minutesToAreaTwo').value;

      let reservationAreaOne = new Reservation(this.id.toString(), startDateOne, endDateOne);
      let reservationAreaTwo = new Reservation(this.id.toString(), startDateTwo, endDateTwo);
      console.log(JSON.stringify(reservationAreaOne));
      console.log(JSON.stringify(reservationAreaTwo));
      console.log(JSON.stringify(this.scheduleRessForm.value));
      this._resourceservice.saveReservation(reservationAreaOne, this.actualConstructionArea.id, this.data.date).subscribe(data=>console.log(JSON.stringify(data)));
      this._resourceservice.saveReservation(reservationAreaTwo, this.otherConstructionArea.id, this.data.date).subscribe(data=>console.log(JSON.stringify(data)));
      debugger;
      switch (this.data.type)
      {
        case 0:
          this.actualConstructionArea.days[this.data.date].employeeList.push(this.data.droppedItem);
          break;
        case 1:
          this.actualConstructionArea.days[this.data.date].vehicleList.push(this.data.droppedItem);
          break;
        case 2:
          this.actualConstructionArea.days[this.data.date].materialList.push(this.data.droppedItem);
          break;
      }
      this._resourceservice.saveConstructionArea(this.actualConstructionArea).subscribe(data=>console.log(JSON.stringify((data))));

    }

    public compareHours(objOne, objTwo) : boolean
    {
      return Number(objOne) > Number(objTwo);

    }

}



