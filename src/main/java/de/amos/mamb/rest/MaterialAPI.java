package de.amos.mamb.rest;

import de.amos.mamb.model.Material;
import de.amos.mamb.model.PersistentObject;

import de.amos.mamb.persistence.PersistenceManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("material")
public class MaterialAPI {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Material> getMaterials(){
        List<Material> material= ofy().load().type(Material.class).list();
        return material;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveMaterial(Material material){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<PersistentObject> list = manager.getEntityWithAttribute("name",material.getName(), Material.class);
        if(list.isEmpty()){
            manager.saveObject(material);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }

}
