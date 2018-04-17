package de.amos.mamb.rest;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Result;
import de.amos.mamb.model.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User user){
        Key<User> userKey = ofy().save().entity(user).now();
        return Response.status(201).entity(user).build();
    }
}
