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


import de.amos.mamb.model.ConstructionLadder;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ObjectCommand;
import de.amos.mamb.rest.command.ResponseCommand;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;



/**
 * REST-Schnittstelle der URL /api/material/
 */
@Path("constructionLadder")
public class ConstructionLadderAPI extends AbstractAPI{

    /**
     * Liefert eine Liste aller Bauleiter zurück
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ConstructionLadder> getConstructionLadder(@Context HttpServletResponse response){
        return executeRequest(response,new ObjectCommand<List<ConstructionLadder>>() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public List<ConstructionLadder> execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<ConstructionLadder> constructionLaddersList = manager.getAllEntities(ConstructionLadder.class);
                return constructionLaddersList;
            }
        });
    }

    /**
     * API Endpoint zum speichern eines Betriebsmittel über den PersistentManager
     *
     * @param constructionLadder
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveConstructionLadder(ConstructionLadder constructionLadder){
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

                manager.saveObject(constructionLadder);
                return Result.NO_STRING;
            }
        });
    }
}
