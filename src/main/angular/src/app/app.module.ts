import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSidenavModule, MatToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppService} from "./app.service";
import {NgModule} from "@angular/core";
import {PlToolbarComponent} from "./toolbar/toolbar.component";


@NgModule ({
  declarations: [
    AppComponent,
    PlToolbarComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
