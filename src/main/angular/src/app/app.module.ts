import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppService} from "./app.service";
import {NgModule} from "@angular/core";


@NgModule ({
  declarations: [
    AppComponent
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
    FlexLayoutModule,
    MatSidenavModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
