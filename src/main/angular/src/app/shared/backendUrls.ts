
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

 /**
 *
 * Exportiert ein Objekt, in dem die Pfade auf die REST-API hinterlegt sind.
 * TODO Restlichen URLS eintragen
 *
 */

export const BACKEND_URLS =
{
  CONSTRUCTIONLADDER_URL : "/api/constructionLadder",
  CONSTRUCTION_AREA_URL: "/api/constructionArea",
  CONSTRUCTION_AREA_PERMANENT_URL: this.CONSTRUCTION_AREA_URL + "/permanent",
  CONSTRUCTION_AREA_ADD_RESOURCE_PART: "/addResource",
  CONSTRUCTION_AREA_REMOVE_RESOURCE_PART: "/removeResource"
};
