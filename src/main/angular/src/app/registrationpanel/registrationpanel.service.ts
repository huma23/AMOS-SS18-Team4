import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../../model/user';
import { RegistrationForm } from "../../model/registrationForm";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlRegistrationPanelService {

  constructor(private http:HttpClient) {}

  register(form:RegistrationForm)
  {
    let body = JSON.stringify(form);
    console.log(body);
    return this.http.post('/api/user', body, httpOptions);
  }
}
