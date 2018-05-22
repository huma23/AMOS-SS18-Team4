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

import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.ObjectifyPersistenceManager;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ObjectCommand;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * REST-Schnittstelle der URL /api/constructionArea/
 */
@Path("constructionArea")
public class ConstructionAreaAPI extends AbstractAPI{

    /**
     * Liefert eine Liste aller Dauerbaustellen zurück.
     * Dauerbaustelle ist eine Baustelle mit dem Feld "permanent" == "true"
     *
     * @param response
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/permanent")
    public List<ConstructionArea> getPermanentConstructionArea(@Context HttpServletResponse response){
        return executeRequest(response, new ObjectCommand<List<ConstructionArea>>() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 400;
            }

            @Override
            public List<ConstructionArea> execute() {
                PersistenceManager manger = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<ConstructionArea> entities = manger.getEntityWithAttribute("permanent ==", true, ConstructionArea.class);
                return entities;
            }
        });
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ConstructionArea> getConstructionAreas(){
        List<ConstructionArea> constructions = ofy().load().type(ConstructionArea.class).list();
        return constructions;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveConstructionArea(ConstructionArea constructionArea){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<ConstructionArea> list = manager.getEntityWithAttribute("name",constructionArea.getName(), ConstructionArea.class);
        if(list.isEmpty()){
            manager.saveObject(constructionArea);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }
}
