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

import { NgModule }                     from '@angular/core';
import { RouterModule, Routes}          from "@angular/router";
import { CommonModule }                 from '@angular/common';
import { LoginComponent }               from "./login/login.component";
import { MainviewComponent }            from "./mainview/mainview.component";
import { PlRegistrationPanelComponent}  from './registrationpanel/registrationpanel.component';
import { AddResourceComponent }         from "./Resourcenpanel/add-resource/add-resource.component";
import { AuthentificationGuard }        from './guards/authentification.guard';
import {PermanentConstructionAreaResolver} from "./Resourcenpanel/resource-type-right/resource-type-right-resolver.service";
import {
  EmployeeResolver,
  MaterialResolver,
  VehicleResolver
} from "./Resourcenpanel/resource-type/resource-type-resolver.service";
import {
  ConstructionAreaResolver,
  ConstructionLadderResolver
} from "./calendar/main-calendar/main-calender-resolver.service";
import { RedirectToAppWithParamsComponent }
  from './redirect-to-app-with-params/redirect-to-app-with-params.component';

import {TestDdkomponentComponent} 
from './test-ddkomponent/test-ddkomponent.component';

const routes: Routes =
  [
    { path: '',redirectTo:'app',  pathMatch:'full'},
    { path: 'login',              component: LoginComponent },
    { path: 'app',
      component: RedirectToAppWithParamsComponent,
    },
    { path: 'app/:year/:week',
      component: MainviewComponent,
      canActivate:[AuthentificationGuard],
      resolve: {
        permanent: PermanentConstructionAreaResolver,
        employees: EmployeeResolver,
        vehicles: VehicleResolver,
        materials: MaterialResolver,
        constructionAreas: ConstructionAreaResolver,
        constructionLadders: ConstructionLadderResolver
      }
    },
    { path: 'register',           component: PlRegistrationPanelComponent },
    { path: 'resource',           component: AddResourceComponent },
    { path: 'testDD', component: TestDdkomponentComponent }
  ];

@NgModule({
  imports:
  [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:
  [
    RouterModule
  ],
  providers:[AuthentificationGuard],
  declarations: []
})
export class AppRoutingModule { }
