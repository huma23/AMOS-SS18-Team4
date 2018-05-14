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
import
{
    HttpRequest, 
    HttpHandler, 
    HttpEvent, 
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';

import { Injectable }   from '@angular/core';
import { Observable}    from 'rxjs/Observable';
import { AuthService }  from '../services/auth.service';
import { Token }        from '../../model/token';       

import 'rxjs/add/operator/do';


@Injectable()
export class Interceptor  implements HttpInterceptor
{
    private authService : AuthService;

    constructor(_authService : AuthService)
    {
        this.authService = _authService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Wenn kein valider Token vorhanden ist, gibt es nichts hinzuzufügen
        // Sollte ein Token zurückommen, regelt das der LoginService
        if (!this.authService.hasValidToken())
            return next.handle(req);

        // Valider Token vorhanden
        let token : Token = this.authService.getToken();
        console.log("grapped for token");
        const  newReq = req.clone({
        
        headers:req.headers.set('Authorization',JSON.stringify(token)) 
        });
     
        //
        return  next.handle(newReq)
                .do((httpEvent:HttpEvent<any>) =>
                {
                    if (httpEvent instanceof HttpResponse)
                    {
                        if (httpEvent.ok )
                        {
                            if (httpEvent.headers.has('RefreshToken'))
                            {
                                
                               let refreshToken  = new Token(httpEvent.headers.get('RefreshToken'), "");
                               this.authService.setToken(refreshToken);
                            }
                        } 
                    }
                });
    }
}
