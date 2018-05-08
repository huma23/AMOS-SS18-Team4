package de.amos.mamb.rest;

import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.model.User;
import de.amos.mamb.persistence.PersistenceManager;
import org.apache.commons.codec.digest.DigestUtils;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;


@Path("user")
public class UserAPI {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUser() {
        List<User> result = ofy().load().type(User.class).list();
        return result;
    }

//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    public Response addUser(User user){
//        Key<User> userKey = ofy().save().entity(user).now();
//        return Response.status(201).entity(user).build();
//    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(User user){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        //check if user with this mail is already registered
        List<PersistentObject> list = manager.getEntityWithAttribute("email ==", user.getEmail(), User.class);
        if(list.isEmpty()){
            //save user
            String hash = DigestUtils.shaHex(user.getPassword());
            user.setPassword(hash);
            manager.saveObject(user);
            return Response.status(201).build();
        } else {
            return Response.status(400).build();
        }
    }
}
