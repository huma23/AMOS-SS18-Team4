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
  MatSidenavModule
} from "@angular/material";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule} from "@angular/forms";
import { AppService } from "./app.service";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PlToolbarComponent } from "./toolbar/toolbar.component";
import { MainCalendarComponent } from './calendar/main-calendar/main-calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar/calendar-content/calendar-content.component';
import { CalenderStoreService } from './shared/calender-store.service';
import { CalendarWeekItemComponent } from './calendar/calendar-week-item/calendar-week-item.component';
import { CalendarWeekComponent } from './calendar/calendar-week/calendar-week.component';
import { ResourceTypeComponent } from './Resourcenpanel/resource-type/resource-type.component';
import { ResourceComponent } from './Resourcenpanel/resource/resource.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainviewComponent } from './mainview/mainview.component';
import { RegisterComponent } from './register/register.component';

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
    LoginComponent,
    MainviewComponent,
    RegisterComponent
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
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    AppRoutingModule
  ],
  providers: [AppService, CalenderStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
