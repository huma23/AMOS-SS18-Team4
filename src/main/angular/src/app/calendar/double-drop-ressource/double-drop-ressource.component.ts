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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormsModule }from "@angular/forms";

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

  public hours    : Array<number>  = new Array(7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22);
  public minutes  : Array<number>  = new Array( 0,15,30,45);

  public formContent          : ScheduleTimedRessourceForm;
  public hoursFormControl     : FormControl;
  public crossAreaFormControl : FormControl;


  constructor(
    public dialogRef: MatDialogRef<DoubleDropRessourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { 
      switch (data.type)
      {
        case 0:
          this.dialogText         = this.mitarbeiterString;
          this.dialogSpecificType = data.droppedItem.firstName + data.droppedItem.lastName ;
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

      this.formContent          = new ScheduleTimedRessourceForm(0,0,0,0,0,0,0,0);



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
    public onCloseDialog(result : boolean)
    {
      this.dialogRef.close(result);
    }
    public abortScheduleTimeRess(): void
    {
      this.dialogRef.close(false);
    }

    public onSubmit(form: ScheduleTimedRessourceForm)
    {
      console.log(JSON.stringify(form));
    }

    public compareHours(objOne, objTwo) : boolean
    {
      return Number(objOne) > Number(objTwo);
    }
}


export class ScheduleTimedRessourceForm
{
  constructor
  (
    public hoursFromAreaOne   : number, 
    public minutesFromAreaOne : number,
    public hoursToAreaOne     : number, 
    public minutesToAreaOne   : number,
    public hoursFromAreaTwo   : number, 
    public minutesFromAreaTwo : number,
    public hoursToAreaTwo     : number, 
    public minutesToAreaTwo   : number,
  )
  {}
}
