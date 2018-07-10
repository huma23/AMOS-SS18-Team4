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

import de.amos.mamb.model.*;
import com.google.gson.Gson;
import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.FileInfo;
import de.amos.mamb.model.FileWrapper;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ResponseCommand;
import de.amos.mamb.rest.json.AddResourceData;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;


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
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/{id}/upload/{type}")
    public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
                               @PathParam("id") String id,
                               @FormDataParam("file") FormDataContentDisposition fileDetail,
                               @PathParam("type") String type){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                //check if it is an image or normal attachment
                boolean isImageUpload = type.equals("image")? true : false;

                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                formatter.setTimeZone(TimeZone.getTimeZone("CET"));
                String dateString = formatter.format(date);
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                String filename = fileDetail.getFileName();

                try {
                    FileWrapper wrapper = new FileWrapper(id, filename, dateString, uploadedInputStream, isImageUpload);
                    manager.saveObject(wrapper);

                    Long idL = new Long(id);
                    ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);

                    FileInfo info = new FileInfo(wrapper.getId().toString(), filename, dateString);

                    if(isImageUpload){
                        area.getImages().add(info);
                    } else {
                        area.getAttachments().add(info);
                    }

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
                .header("Content-Disposition", "attachment; filename = " + fileName)
                .build();
    }

    @GET
    @Produces({ "image/png", "image/jpg" })
    @Path("/image/{imageId}")
    public Response getImage(@PathParam("imageId") String imageId){

        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        Long idL = new Long(imageId);
        FileWrapper fileWrapper = manager.getEntityWithId(idL, FileWrapper.class);

        StreamingOutput imageStream = new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                outputStream.write(fileWrapper.getFileData());
                outputStream.flush();
            }
        };

        return Response
                .ok(imageStream)
                .build();
    }

    @DELETE
    @Path("/image/{imageId}")
    public Response removeImage(@PathParam("imageId") String imageId){

        return executeRequest(new ResponseCommand() {

            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 404;
            }

            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(imageId);
                FileWrapper fileWrapper = manager.getEntityWithId(idL, FileWrapper.class);

                if(fileWrapper == null){
                    return Result.FAILED;
                }

                Long idAreaL = new Long(fileWrapper.getConstructionAreaId());
                ConstructionArea area = manager.getEntityWithId(idAreaL, ConstructionArea.class);

                if(area == null){
                    return Result.FAILED;
                }

                FileInfo toRemove = null;
                for(FileInfo info : area.getImages()){
                    if(info.getId().equals(imageId)){
                        toRemove = info;
                        break;
                    }
                }

                if(toRemove != null){
                    area.getImages().remove(toRemove);
                }

                manager.saveObject(area);
                manager.removeObject(fileWrapper);

                return Result.NO_STRING;
            }
        });
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}/addNote")
    public Response addNote(@PathParam("id") String id, String note)
    {
        return executeRequest(new ResponseCommand(){
            @Override
            public int httpOnSuccess()
            {
                return 200;
            }

            @Override
            public int httpOnCommandFailed()
            {
                return 400;
            }

            @Override
            public String execute()
            {
                Gson gson       = new Gson();
                Note newNote    = gson.fromJson(note,Note.class);

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(id);
                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);

                if (!newNote.isValid())
                    return Result.FAILED;

                area.addNote(newNote);
                manager.saveObject(area);
                return Result.NO_STRING;
            }
        });

    }
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}/changeProgress")
    public Response changeProgress(@PathParam("id") String id, String progress)
    {
        return executeRequest(new ResponseCommand(){
            @Override
            public int httpOnSuccess()
            {
                return 200;
            }

            @Override
            public int httpOnCommandFailed()
            {
                return 400;
            }

            @Override
            public String execute()
            {
                Gson gson           = new Gson();
                DummyProgress newProgress  = gson.fromJson(progress,DummyProgress.class);
                
                if (newProgress == null)
                    return Result.FAILED; 

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(id);
                
                
                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);
                area.setProgress(newProgress.getProgress());
                manager.saveObject(area);
                return Result.NO_STRING;
            }
        });
    }

    @POST
    @Path("/{areaId}/removeReservation/{date}/{resourceId}")
    public Response removeReservation(@PathParam("areaId") String areaId,
                                      @PathParam("date") String date,
                                      @PathParam("resourceId") String resourceId){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(areaId);
                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);
                Long resIdL = new Long(resourceId);

                boolean found = area.removeReservation(date, resIdL);

                if(found){
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
    @Path("/{id}/addReservation/{date}")
    public Response addReservation(@PathParam("id") String id,
                                   @PathParam("date") String date,
                                   String reservation){

        return executeRequest(new ResponseCommand() {
            @Override
            public String execute() {

                Gson gson = new Gson();
                Reservation res = gson.fromJson(reservation, Reservation.class);

                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                Long idL = new Long(id);

                ConstructionArea area = manager.getEntityWithId(idL, ConstructionArea.class);
                area.addReservations(date, res);

                manager.saveObject(area);
                return Result.NO_STRING;
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
}
