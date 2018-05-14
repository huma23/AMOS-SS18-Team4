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


import { TestBed, inject, getTestBed }  from '@angular/core/testing';
import { AuthService }                  from './auth.service';
import { Token }                        from '../../model/token';

describe('MAMB Authentification Service Test', () => 
{
  const dummyToken  = new Token("123456456", "1123313213233321");
  const dummyToken2 = new Token("qedfsdvff47689448", "sdf6544f4wef4wwef");
  const tokenIdent  = AuthService.TokenIdentifier;
  const tokenExp    = AuthService.TokenExpiration;

  let serviceUnderTest  : AuthService;
  let injector          : TestBed;


  beforeEach(() => 
  {
    TestBed.configureTestingModule
    (
      {
        providers: [AuthService]
      }
    );

    injector          = getTestBed();
    serviceUnderTest  = injector.get(AuthService);
  })

  

  it('Test if Service is created', inject([AuthService], (service: AuthService) =>
  {
    expect(service).toBeTruthy();
  }));

  it('Test Token Setzen, Abfragen ob Wert gespeichert',() =>
  {
    // Setzen des DummyToken
    serviceUnderTest.setToken(dummyToken);
    // Explizites Auslesen des Storages
    expect(localStorage.getItem(tokenIdent)).toBe(dummyToken.token);
    expect(localStorage.getItem(tokenExp)).toBe(dummyToken.timestampt);

    // Interner Status sollte gesetzt sein
    expect(serviceUnderTest.hasValidToken()).toBe(true);
  
  });
  
  it ('Test token Abfrage auf leeren Speicher --> return false ', () =>
  {
    expect(serviceUnderTest.hasValidToken()).toBeFalsy();
  });
  
  it ('Setzen des Token, Abfrage, Token verändern, Abfrage', () => 
  {
        // Setzen des DummyToken
        serviceUnderTest.setToken(dummyToken);
        // Explizites Auslesen des Storages
        expect(localStorage.getItem(tokenIdent)).toBe(dummyToken.token);
        expect(localStorage.getItem(tokenExp)).toBe(dummyToken.timestampt);
    
        // Interner Status sollte gesetzt sein
        expect(serviceUnderTest.hasValidToken()).toBe(true);

        // Setzen des DummyToken2
        serviceUnderTest.setToken(dummyToken2);

        // Explizites Auslesen des Storages Check gegen Dummy1
        expect(localStorage.getItem(tokenIdent)).not.toBe(dummyToken.token);
        expect(localStorage.getItem(tokenExp)).not.toBe(dummyToken.timestampt);
    
        // Interner Status sollte gesetzt sein
        expect(serviceUnderTest.hasValidToken()).toBe(true);


        // Explizites Auslesen des Storages Check gegen Dummy2
        expect(localStorage.getItem(tokenIdent)).toBe(dummyToken2.token);
        expect(localStorage.getItem(tokenExp)).toBe(dummyToken2.timestampt);
  });
});
