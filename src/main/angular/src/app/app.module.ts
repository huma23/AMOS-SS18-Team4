import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule,MatTableModule, MatToolbarModule} from "@angular/material";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppService} from "./app.service";
import {NgModule} from "@angular/core";
import { MainCalendarComponent } from './calendar/main-calendar/main-calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar/calendar-content/calendar-content.component';
import { CalenderStoreService } from './shared/calender-store.service';
import { CalendarWeekItemComponent } from './calendar/calendar-week-item/calendar-week-item.component';
import { CalendarWeekComponent } from './calendar/calendar-week/calendar-week.component';


@NgModule ({
  declarations: [
    AppComponent,
    MainCalendarComponent,
    CalendarHeaderComponent,
    CalendarContentComponent,
    CalendarWeekItemComponent,
    CalendarWeekComponent
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
    MatListModule
  ],
  providers: [AppService, CalenderStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
