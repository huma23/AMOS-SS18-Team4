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

import {Injectable} 
from "@angular/core";

import {IConstructionArea}
from "../../Resourcenpanel/IConstructionArea";

import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot}
from "@angular/router";

import {Observable}
from "rxjs/Observable";

import {ConstructionLadderService}
from "../../services/construction-ladder.service";
import { IConstructionLadder } from "../../Resourcenpanel/IConstructionLadder";

/**
 * */

@Injectable()
export class ConstructionLadderResolver implements Resolve<IConstructionLadder[]>{

  private constructionLadderService : ConstructionLadderService;

  constructor(_constructionLAdderService : ConstructionLadderService)
  {
      this.constructionLadderService = _constructionLAdderService;
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConstructionLadder[]> | Promise<IConstructionLadder[]> | IConstructionLadder[] {

    return this.constructionLadderService.getAllContstructionLadders();
  }
}
