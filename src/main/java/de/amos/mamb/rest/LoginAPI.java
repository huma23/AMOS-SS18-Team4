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

import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.model.User;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.session.TokenManager;
import org.apache.commons.codec.digest.DigestUtils;

import javax.json.Json;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

@Path("login")
public class LoginAPI {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response loginUser(User user){

        //First hash password
        String hash = DigestUtils.shaHex(user.getPassword());
        user.setPassword(hash);

        //Lookup for user with given email
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<PersistentObject> list = manager.getEntityWithAttribute("email ==", user.getEmail(), User.class);
        if(list.isEmpty()){
            //Given User not found
            return Response.status(400).build();
        }

        User foundUser = (User) list.get(0);

        //compare passwords
        if(!user.getPassword().equals(foundUser.getPassword())){
            //Not equal - return bad request
            return Response.status(400).build();
        }

        //equal create token and response
        TokenManager tokenManager = TokenManager.getInstance();
        try {
            String token = tokenManager.createToken(foundUser.getId());
            Date timestamp = new Date();

            String json = Json.createObjectBuilder()
                    .add("token", token)
                    .add("timestamp", timestamp.toString())
                    .build()
                    .toString();

            return Response.status(200).entity(json).type(MediaType.APPLICATION_JSON).build();

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return Response.status(500).build();
        }
    }
}
