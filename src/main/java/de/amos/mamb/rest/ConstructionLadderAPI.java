package de.amos.mamb.rest;


import de.amos.mamb.model.ConstructionLadder;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.PersistenceManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("constructionLadder")
public class ConstructionLadderAPI {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ConstructionLadder> getConstructionLadder(){
        List<ConstructionLadder> constructionLadders = ofy().load().type(ConstructionLadder.class).list();
        return constructionLadders;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveConstructionLadder(ConstructionLadder constructionLadder){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<ConstructionLadder> list = manager.getEntityWithAttribute("lastName",constructionLadder.getLastName(), ConstructionLadder.class);
        if(list.isEmpty()){
            manager.saveObject(constructionLadder);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }
}
