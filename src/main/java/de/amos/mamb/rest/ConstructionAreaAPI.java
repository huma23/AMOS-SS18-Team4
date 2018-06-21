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
import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.FileInfo;
import de.amos.mamb.model.FileWrapper;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ResponseCommand;
import de.amos.mamb.rest.json.AddResourceData;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


/**
 * REST-Schnittstelle der URL /api/constructionArea/
 */
@Path("constructionArea")
public class ConstructionAreaAPI extends AbstractAPI{

    /**
     * Liefert eine Liste aller Dauerbaustellen zurück.
     * Dauerbaustelle ist eine Baustelle mit dem Feld "permanent" == "true"
     *
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/permanent")
    public Response getPermanentConstructionArea(){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                PersistenceManager manger = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<ConstructionArea> entities = manger.getEntityWithAttribute("permanent ==", true, ConstructionArea.class);

                Gson gson = new Gson();
                String json = gson.toJson(entities);
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

    /**
     * Diese Methode liefert alle Baustellen innerhalb einer bestimmten Kalenderwoche zurück
     *
     * @param year
     * @param week
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{year}/{week}")
    public Response getConstructionAreasFromDate(@PathParam("year") int year, @PathParam("week") int week){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                //Datumsformat
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

                //Datum parsen
                Calendar calendar = Calendar.getInstance();
                calendar.set(Calendar.WEEK_OF_YEAR, week);
                calendar.set(Calendar.YEAR, year);
                calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                Date dateBegin = calendar.getTime();
                String searchedDateBegin = formatter.format(dateBegin);

                calendar.set(Calendar.WEEK_OF_YEAR, week);
                calendar.set(Calendar.YEAR, year);
                calendar.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
                calendar.set(Calendar.HOUR_OF_DAY, 24);
                Date dateEnd = calendar.getTime();
                String searchedDateEnd = formatter.format(dateEnd);

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<ConstructionArea> listStartDateFilterd = manager.getEntityWithTwoAttributes("startDate >=", searchedDateBegin, "startDate <=", searchedDateEnd, ConstructionArea.class);
                List<ConstructionArea> listEndDateFiltered = manager.getEntityWithTwoAttributes("endDate >=", searchedDateBegin, "endDate <=", searchedDateEnd, ConstructionArea.class);

                for(ConstructionArea area : listEndDateFiltered){
                    if(!listStartDateFilterd.contains(area))
                        listStartDateFilterd.add(area);
                }

                Gson gson = new Gson();
                String json = gson.toJson(listStartDateFilterd);
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

    /**
     * Liefert eine Liste aller Bauleiter zurück
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConstructionAreas() {
        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                PersistenceManager manger = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<ConstructionArea> entities = manger.getAllEntities(ConstructionArea.class);

                Gson gson = new Gson();
                String json = gson.toJson(entities);
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
    /**
     * API Endpoint zum speichern einer Baustelle über den PersistentManager
     *
     * @param area
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveConstructionArea(String area) {
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
                Gson gson = new Gson();
                ConstructionArea constructionArea = gson.fromJson(area, ConstructionArea.class);
                constructionArea.setDays(constructionArea.getDays());

                PersistenceManager instance = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                instance.saveObject(constructionArea);
                return Result.NO_STRING;
            }
        });
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}/addResource")
    public Response addResource(@PathParam("id") String id, String addResourceData){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {
                Gson gson = new Gson();
                AddResourceData data = gson.fromJson(addResourceData, AddResourceData.class);

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(id);
                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);
                PersistentObject object = null;

                if(data.getEmployee() != null){
                    object = data.getEmployee();
                }

                if(data.getMaterial() != null){
                    object = data.getMaterial();
                }

                if(data.getVehicle() != null){
                    object = data.getVehicle();
                }

                if(object != null){
                    if(data.isPermanent()){
                        area.addResourceToEveryDay(object);
                    } else {
                        area.addResourceToDay(object, data.getDay());
                    }

                    manager.saveObject(area);
                    return Result.NO_STRING;
                }

                return Result.FAILED;
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}/removeResource")
    public Response removeResource(@PathParam("id") String id, String addResourceData){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {
                Gson gson = new Gson();
                AddResourceData data = gson.fromJson(addResourceData, AddResourceData.class);

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(id);
                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);
                PersistentObject object = null;

                if(data.getEmployee() != null){
                    object = data.getEmployee();
                }

                if(data.getMaterial() != null){
                    object = data.getMaterial();
                }

                if(data.getVehicle() != null){
                    object = data.getVehicle();
                }

                if(object != null){
                    if(data.isPermanent()){
                        area.removeResourceToEveryDay(object);
                    } else {
                        area.removeResourceToDay(object, data.getDay());
                    }

                    manager.saveObject(area);
                    return Result.NO_STRING;
                }

                return Result.FAILED;
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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/upload/{filename}")
    public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
                               @PathParam("id") String id,
                               @PathParam("filename") String filename){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                String dateString = formatter.format(date);
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

                try {
                    FileWrapper wrapper = new FileWrapper(id, filename, dateString, uploadedInputStream);
                    manager.saveObject(wrapper);

                    Long idL = new Long(id);
                    ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);

                    FileInfo info = new FileInfo(wrapper.getId().toString(), filename, dateString);
                    area.getAttachments().add(info);
                    manager.saveObject(area);

                    Gson gson = new Gson();
                    String json = gson.toJson(info);

                    return json;

                } catch (IOException e) {
                    return Result.FAILED;
                }
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

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/attachment/{fileId}")
    public Response downloadFile(@PathParam("fileId") String fileId){

        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        Long idL = new Long(fileId);
        FileWrapper fileWrapper = manager.getEntityWithId(idL, FileWrapper.class);
        String fileName = fileWrapper.getName();

        StreamingOutput fileStream = new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                outputStream.write(fileWrapper.getFileData());
                outputStream.flush();
            }
        };

        return Response
                .ok(fileStream)
                .header("content-disposition", "attachment; filename = " + fileName)
                .build();
    }
}
