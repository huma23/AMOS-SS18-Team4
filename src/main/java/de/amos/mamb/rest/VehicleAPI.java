package de.amos.mamb.rest;

import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.model.Vehicle;
import de.amos.mamb.persistence.PersistenceManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("vehicle")
public class VehicleAPI {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Vehicle> getVehicles(){
        List<Vehicle> vehicles = ofy().load().type(Vehicle.class).list();
        return vehicles;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveVehicle(Vehicle vehicle){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<Vehicle> list = manager.getEntityWithAttribute("bezeichnung",vehicle.getBezeichnung(), Vehicle.class);
        if(list.isEmpty()){
            manager.saveObject(vehicle);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }
}
