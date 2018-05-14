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

import { Token }                                            from '../../model/token';
import { TestBed,getTestBed,inject }                      from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController}  from '@angular/common/http/testing';
import { AuthService }                                    from '../services/auth.service';
import { Interceptor  }                                   from './interceptor';
import { HTTP_INTERCEPTORS, HttpClient ,HttpHeaders }                  from '@angular/common/http';

const dummyToken: Token = new Token("132154684689646556461321", "445445546654654");

describe('MAMB Interceptor Test', () => {

  let injector  : TestBed;
  let httpMock  : HttpTestingController;
  let service   : AuthService;
  let hClient   : HttpClient;
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:
      [
        AuthService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:Interceptor, 
          multi:true,
        }
      ]
    });
    injector = getTestBed();
    hClient  = injector.get(HttpClient);
    httpMock = injector.get(HttpTestingController);
    service  = injector.get(AuthService);
  });




  it('Test if Auth Header added without Token should be not!', () =>
  {
    hClient.get("/beispielApi").subscribe((data)=>
    {
 
    });
    console.log("ello World");
    const req = httpMock.expectOne('/beispielApi');
 
    
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).not.toBe(true);
    req.flush(dummyToken); 
  });

  it('Test if Auth Header added on Phantasie call!', () =>
  {
    service.setToken(dummyToken);

    hClient.get("/beispielApi").subscribe((data)=>
    {
   
    });
    console.log("hello World");
    const req = httpMock.expectOne('/beispielApi');
  
    
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    req.flush(dummyToken); 
  });

  it('Test if Auth Header added on Phantasie call! plus detect change on Token ', () =>
  {
    service.setToken(dummyToken);
  

    hClient.get("/beispielApi").subscribe((data)=>
    {
      
    });
    console.log("hello World");
    const req = httpMock.expectOne('/beispielApi');

    
    const httpOptions = {
      headers: new HttpHeaders({ 'RefreshToken': '123456789' })
      
    };
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    req.flush(dummyToken, httpOptions);
    expect(localStorage.getItem("PlAccessToken")).toBe("123456789");
  });
});
