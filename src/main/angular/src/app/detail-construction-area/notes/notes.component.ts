import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../model/Note';
import { User } from '../../../model/user';
import { AddResourceService } from '../../services/add-resource.service';
import * as moment  from 'moment';
import { PlLoginService } from '../../login/login.service';


@Component({
  selector: 'pl-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input()
  public notes : Note[]

  @Input()
  public id;

  public editMode : boolean;
  public hasNotes : boolean;
  private addRessService : AddResourceService;
  private loginService : PlLoginService;

  constructor(_resService: AddResourceService, _loginService : PlLoginService) 
  {
    this.addRessService = _resService;
    this.loginService = _loginService;
    this.editMode = false;
    this.hasNotes = false;
    moment.locale();
  }

  ngOnInit()
  {
    if (this.notes.length > 0)
      this.hasNotes=true;
    
    console.log(this.notes.length);
  }

  openEditMode() : void 
  {
    this.editMode = true;
    
  }
  addNoteToArea(title:string, message:string) : void
  {
   
    let note:Note = new Note(title,message,moment().format('LLL'),this.loginService.getUser());
    this.notes.push(note);
    this.editMode = false;
    if (!this.hasNotes)
      this.hasNotes=true;
    this.addRessService.addNoteToArea(note, this.id);
  }
  cancelAddNote():void
  {
    this.editMode = false;
  }
}
