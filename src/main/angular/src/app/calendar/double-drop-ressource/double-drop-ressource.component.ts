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

  public dialogTextEnding : string = "wurde bereits für ein anderes Projekt eingetragen.\n Dennoch zuordnen?";


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
}
