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
public class UserAPI extends AbstractAPI{


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUser() {

        return executeRequest(new Command() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public Object execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<PersistentObject> userList = manager.getAllEntities(User.class);
                return userList;
            }
        });
    }

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
