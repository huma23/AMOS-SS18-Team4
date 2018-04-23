import { Component } from '@angular/core';
import { User } from "../model/user";
import {Observable} from 'rxjs/Rx';
import { AppService } from "./app.service";
import { OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'pl-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  model = new User("");
  users;

  constructor(private appservice: AppService){}

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    this.appservice.getUser().subscribe(
      data => { this.users = data},
      error1 => {console.error("can not load user.")},
      () => {console.log("finished")}
    );
  }

  onSubmit(user: User) {
    this.appservice.saveUser(user).subscribe(
      data => {
        this.getUser();
        return true;
      },
      error1 => {
        console.error("can not create user")
      }
    );
  }
}
