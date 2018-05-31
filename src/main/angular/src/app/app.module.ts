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


import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
} from "@angular/material";

import { MatGridListModule }  from '@angular/material/grid-list';
import { AppComponent }       from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS }   from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppService } from "./app.service";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PlToolbarComponent } from "./toolbar/toolbar.component";
import { MainCalendarComponent } from './calendar/main-calendar/main-calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar/calendar-content/calendar-content.component';
import { CalenderStoreService } from './services/calender-store.service';
import { CalendarWeekItemComponent } from './calendar/calendar-week-item/calendar-week-item.component';
import { CalendarWeekComponent } from './calendar/calendar-week/calendar-week.component';
import { ResourceTypeComponent } from './Resourcenpanel/resource-type/resource-type.component';
import { ResourceComponent }  from './Resourcenpanel/resource/resource.component';
import { PlRegistrationPanelComponent} from "./registrationpanel/registrationpanel.component";
import { PlRegistrationPanelService } from './registrationpanel/registrationpanel.component';
import { AppRoutingModule }   from './app-routing.module';
import { LoginComponent }     from './login/login.component';
import { MainviewComponent }  from './mainview/mainview.component';
import { RegisterComponent }  from './register/register.component';
import { PlLoginService }     from './login/login.service';
import { AuthService }        from './services/auth.service';

import { ResourceService} from "./Resourcenpanel/resource.service";
import { AddResourceComponent } from './Resourcenpanel/add-resource/add-resource.component';
import { Interceptor } from './http/interceptor';
import { FakeInterceptor} from './http/fake-interceptor';
import {ResourceTypeRightComponent} from "./Resourcenpanel/resource-type-right/resource-type-right.component";
import {ResourcePipe} from "./Resourcenpanel/resource/resource.pipe";
import {PermanentConstructionAreaResolver} from "./Resourcenpanel/resource-type-right/resource-type-right-resolver.service";
import {
  EmployeeResolver,
  MaterialResolver,
  VehicleResolver
} from "./Resourcenpanel/resource-type/resource-type-resolver.service";
import { RedirectToAppWithParamsComponent } 
from './redirect-to-app-with-params/redirect-to-app-with-params.component';



@NgModule ({
  declarations: [
    AppComponent,
    MainCalendarComponent,
    CalendarHeaderComponent,
    CalendarContentComponent,
    CalendarWeekItemComponent,
    CalendarWeekComponent,
    PlToolbarComponent,
    ResourceTypeComponent,
    ResourceComponent,
    PlRegistrationPanelComponent,
    LoginComponent,
    MainviewComponent,
    RegisterComponent,
    AddResourceComponent,
    ResourceTypeRightComponent,
    ResourcePipe,
    RedirectToAppWithParamsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers:
  [
      {
        provide:HTTP_INTERCEPTORS,
        useClass:Interceptor,
        multi:true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass:FakeInterceptor,
        multi:true
      },
      AppService,
      AuthService,
      CalenderStoreService,
      PlRegistrationPanelService,
      PlLoginService,
      ResourceService,
      PermanentConstructionAreaResolver,
      EmployeeResolver,
      MaterialResolver,
      VehicleResolver
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
