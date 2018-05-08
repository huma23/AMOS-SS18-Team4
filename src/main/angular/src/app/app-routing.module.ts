import { NgModule }                     from '@angular/core';
import { RouterModule, Routes}          from "@angular/router";
import { CommonModule }                 from '@angular/common';
import { LoginComponent }               from "./login/login.component";
import { MainviewComponent }            from "./mainview/mainview.component";
import { PlToolbarComponent }           from "./toolbar/toolbar.component";
import { RegisterComponent }            from "./register/register.component";
import { PlRegistrationPanelComponent}  from './registrationpanel/registrationpanel.component';
import {AddResourceComponent} from "./Resourcenpanel/add-resource/add-resource.component";

const routes: Routes =
  [
    { path: '',    component: LoginComponent },
    { path: 'login',    component: LoginComponent },
    { path: 'app',             component: MainviewComponent },
    { path: 'app/:year/:week', component: MainviewComponent },
    { path: 'register',        component: PlRegistrationPanelComponent },
    { path: 'resource', component: AddResourceComponent}
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
  declarations: []
})
export class AppRoutingModule { }
