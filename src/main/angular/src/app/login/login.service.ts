import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationForm } from "../../model/registrationForm";
import {LoginForm} from "../../model/loginForm";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlLoginService {

  constructor(private http:HttpClient) {}

  register(form:LoginForm)
  {
    //let body = JSON.stringify(form);
    //return this.http.post('/api/user', body, httpOptions);
  }
}
