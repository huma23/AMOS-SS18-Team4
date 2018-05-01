import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {MainviewComponent} from "./mainview/mainview.component";
import {PlToolbarComponent} from "./toolbar/toolbar.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'app', component: MainviewComponent},
  // RegisterComponent Dummy!!! Hier kommt Manus componente rein!
  { path: 'register', component: RegisterComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
