import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppService} from "./app.service";
import {NgModule} from "@angular/core";
import { ResourceTypeComponent } from './Resourcenpanel/resource-type/resource-type.component';
import { ResourceComponent } from './Resourcenpanel/resource/resource.component';


@NgModule ({
  declarations: [
    AppComponent,
    ResourceTypeComponent,
    ResourceComponent
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
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
