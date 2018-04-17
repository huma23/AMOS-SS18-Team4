import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from "../model/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppService {

  constructor(private http:HttpClient) {}

  getUser() {
    return this.http.get('/api/user');
  }

  saveUser(user:User){
    let body = JSON.stringify(user);
    return this.http.post('/api/user', body, httpOptions);
  }
}
