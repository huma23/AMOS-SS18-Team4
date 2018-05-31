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

import { CPlan }                from './c-plan';
import { IConstructionLadder }  from '../Resourcenpanel/IConstructionLadder';
import { ConstructionLadder } from '../../model/constructionLadder';
export { CPlan }                from './c-plan';

 /**
 *
 * @class ConstructionManager
 *
 * Die Klasse/Modell ConstructionManager ist eine Abstraktion eines Bauleiters.
 * Die Klasse ist nur testweise aktiv, da noch zu entwickelnde Modelle zur exakten Abstraktion
 * eines Bauleiters und dessen Attribute fehlen.
 *
 * @see (central).Readme
 *
 *
 *
 */
export class ConstructionManager
{
    public firstName            : string;
    public lastName             : string;
    // loakale Member
    public title                : string;
    //public constructionPlans    : Array<CPlan>;


    constructor
    (
        _cLadder    : IConstructionLadder
    )

    {
        this.firstName          = _cLadder.firstName;
        this.lastName           = _cLadder.lastName;
        //this.constructionPlans  = new Array(6);
        //this.initConstructionPlans();

    }
    getCLadder()
    {
        return new ConstructionLadder(this.firstName, this.lastName);
    }
    /*
    private initConstructionPlans()

    {

        for(let i = 0; i < 6; i++)
        {
            this.constructionPlans[i] = CPlan.getEmptyCPlan();
        }

    }
    */
}
