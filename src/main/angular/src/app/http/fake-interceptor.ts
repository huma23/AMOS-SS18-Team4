
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
}   from '@angular/common/http';

import { Injectable, isDevMode }           from '@angular/core';
import { Observable}            from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class FakeInterceptor  implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Wenn es sich um den Productionscode handelt, request weiter
         if(!isDevMode())
         {
            console.log("Production Mode, Fake Interceptor off!");
            return  next.handle(req);
         }
        // TestModus
        else 
        {
            const newUrl = environment.runningBackEndUrl +req.url;
            console.log("Alte Url: " + req.url);
            console.log("Neue Url: " +newUrl);
            
            //Request Klonen und neue Url setzen.
            let newReq = req.clone({
                url:newUrl
            });

            return next.handle(newReq);
        }
    }
}

