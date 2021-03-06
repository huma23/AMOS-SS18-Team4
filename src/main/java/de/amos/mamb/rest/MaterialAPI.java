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

package de.amos.mamb.rest;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.ConstructionAreaDay;
import de.amos.mamb.model.Material;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ObjectCommand;
import de.amos.mamb.rest.command.ResponseCommand;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * REST-Schnittstelle der URL /api/material/
 */
@Path("material")
public class MaterialAPI extends AbstractAPI {
    /**
     * Liefert eine Liste aller Betriebsmittel zurück.
     *
     *
     * @param response
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMaterials(){
        return executeRequest(new ResponseCommand() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<Material> materialList = manager.getAllEntities(Material.class);

                Gson gson = new Gson();
                String json = gson.toJson(materialList);

                return json;
            }
        });
    }

    /**
     * Liefert eine Liste von Betriebsmitteln, welche in der gegebenen Jahr/Woche noch nicht zu einer Baustelle eingeplant wurden
     * @param year
     * @param week
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{year}/{week}")
    public Response getMaterialFromDate(@PathParam("year") int year, @PathParam("week") int week){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

                //Alle Baustellen gefilter nach Year/Week
                ConstructionAreaAPI constructionAreaAPI = new ConstructionAreaAPI();
                Response response = constructionAreaAPI.getConstructionAreasFromDate(year,week);

                //Type um Gson parsen zu lassen in eine Liste
                Type listType = new TypeToken<ArrayList<ConstructionArea>>(){}.getType();
                Gson gson = new Gson();

                //Datenstream vom Response
                String areas = response.getEntity().toString();

                //Konvertieren in eine Liste
                List<ConstructionArea> list = gson.fromJson(areas, listType);

                //Alle Betriebsmittel holen
                List<Material> materials = manager.getAllEntities(Material.class);

                //Baustellen durchlaufen und Betriebsmittel rauslöschen
                for(ConstructionArea area : list){
                    //Hole die Map aller ConstructionAreaDays, welche eine Liste von Materials enthält
                    Map<String, ConstructionAreaDay> map = area.getDays();
                    //Methode zum entfernen der schon genutzten Materials in einer Baustelle
                    materials = deleteUsedMaterials(map, materials);
                }
                String json = gson.toJson(materials);
                return json;
            }

            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 400;
            }
        });
    }

    // entfernt einzelne Betriebsmittel aus der gesamten Betriebsmittelliste, wenn diese in irgendeiner Baustelle schon eingesetzt sind
    private List<Material> deleteUsedMaterials(Map<String,ConstructionAreaDay> constructionAreas, List<Material> materials){
        for(Map.Entry<String, ConstructionAreaDay> entry : constructionAreas.entrySet()){
            List<Material> tmpMaterials = entry.getValue().getMaterialList();
            materials.removeAll(tmpMaterials);
        }
        return materials;
    }


    /**
     * API Endpoint zum speichern eines Betriebsmittel über den PersistentManager
     *
     * @param material
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveMaterial(Material material){
        return executeRequest(new ResponseCommand() {
            @Override
            public int httpOnSuccess() {
                return 201;
            }

            @Override
            public int httpOnCommandFailed() {
                return 400;
            }

            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

                manager.saveObject(material);
                return Result.NO_STRING;

            }
        });
    }

}
