package de.amos.mamb.rest;

import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.PersistenceManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("constructionArea")
public class ConstructionAreaAPI {

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
        List<PersistentObject> list = manager.getEntityWithAttribute("name",constructionArea.getName(), ConstructionArea.class);
        if(list.isEmpty()){
            manager.saveObject(constructionArea);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }
}