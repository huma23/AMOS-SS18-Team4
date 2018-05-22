package de.amos.mamb.rest;

import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.model.User;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ObjectCommand;
import de.amos.mamb.rest.command.ResponseCommand;
import org.apache.commons.codec.digest.DigestUtils;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("user")
public class UserAPI extends AbstractAPI{


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUser(@Context HttpHeaders httpHeaders, @Context HttpServletResponse response) {

        return executeRequestWithValidation(httpHeaders, response, new ObjectCommand<List<User>>() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public List<User> execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<User> userList = manager.getAllEntities(User.class);
                return userList;
            }
        });
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(User user){

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

                //check if user with this mail is already registered
                List<User> list = manager.getEntityWithAttribute("email ==", user.getEmail(), User.class);
                if(list.isEmpty()){
                    //save user
                    String hash = DigestUtils.shaHex(user.getPassword());
                    user.setPassword(hash);
                    manager.saveObject(user);
                    return Result.NO_STRING;
                } else {
                    return Result.FAILED;
                }
            }
        });
    }
}
