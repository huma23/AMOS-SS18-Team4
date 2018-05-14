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

import { TestBed, getTestBed }                              from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }   from '@angular/common/http/testing';
import { AuthService }                                      from '../services/auth.service';
import { PlLoginService }                                   from './login.service';
import { Token }                                            from '../../model/token';
import { LoginForm }                                        from '../../model/loginForm';
import { Observable }                                       from 'rxjs/Observable';



describe('MAMB LoginService Test', () =>{

    
    let injector    : TestBed;
    let service     : PlLoginService;
    let httpMock    : HttpTestingController;
    
    
    const dummyToken: Token = new Token("132154684689646556461321", "445445546654654");

    beforeEach(() =>
    {
        TestBed.configureTestingModule
        (
            {
                imports: [HttpClientTestingModule],
                providers: [AuthService,PlLoginService]
            }
        );
        injector    = getTestBed();
        service     = injector.get(PlLoginService);
        httpMock    = injector.get(HttpTestingController);
    });

    describe('Testing LoginService' ,() =>{

        it('Testing Login Function : Testing Send/Request, Identical Data, Internal Status', () =>
        {
            console.log("--------Starting Test on LoginService-------");
            
            const dummyLoginForm : LoginForm  = new LoginForm("test@test.de", "Hansi88DeineMutter");
            console.log(String(service));
            
            service.login(dummyLoginForm).subscribe( data =>
            {
                console.log("Call on Api /Login happened: Within Happy Path"  );
                console.log("-----Verify if Token is defined");
                console.log(data);
                expect(data).toBeDefined();
                console.log("-----Verifing on equal submitted Values");

                // Test ob Inhalt empfangenes Token dem versendeten entspricht
                expect(Number(data.token)).toBeLessThanOrEqual(Number(dummyToken.token));
                expect(Number(data.timestampt)).toBeLessThanOrEqual(Number(dummyToken.timestampt));

                    // Setzen des Login Status für folgende Tests;
                service.setLogin(true);
                service.setToken(data);
                console.log("-----Verifing Internal Login Status to Be true");
                expect(service.isLoggedIn()).toBeTruthy();
            }, 
            error =>
            {
                console.log("Call on Api /Login happened: Within Error Path"  );
                    
            });     
            
        
        const req = httpMock.expectOne('/api/login');
        expect(req.request.method).toBe('POST');
        req.flush(dummyToken); 
        });

        it('After Login, Token : Token should be set within local Storage', () => 
        {
            expect(localStorage.getItem('PlAccessToken')).not.toBeNull();
            expect(Number(localStorage.getItem('PlAccessToken')))
                .toBeLessThanOrEqual(Number(dummyToken.token));
            
        });

        it('After Login, Token : TimeStamp should be set within local Storage', () => 
        {
            expect(localStorage.getItem('PlAccessToken')).not.toBeNull();
            expect(Number(localStorage.getItem('PlAccessToken')))
                .toBeLessThanOrEqual(Number(dummyToken.token));
        });

       
        it('Setting Login to True , Internal Status should be true on LoggedIn', () => 
        {
            service.setLogin(true);
            expect(service.isLoggedIn()).toBeTruthy();
        });
    });
});