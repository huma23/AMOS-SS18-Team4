import { NgModule }                     from '@angular/core';
import { RouterModule, Routes}          from "@angular/router";
import { CommonModule }                 from '@angular/common';
import { LoginComponent }               from "./login/login.component";
import { MainviewComponent }            from "./mainview/mainview.component";
import { PlRegistrationPanelComponent}  from './registrationpanel/registrationpanel.component';

const routes: Routes =
  [
    { path: '',    component: LoginComponent },
    { path: 'login',    component: LoginComponent },
    { path: 'app',      component: MainviewComponent},
    { path: 'register', component: PlRegistrationPanelComponent }
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
