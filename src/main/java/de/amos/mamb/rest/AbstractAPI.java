package de.amos.mamb.rest;

import com.auth0.jwt.exceptions.JWTVerificationException;
import de.amos.mamb.session.TokenManager;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;

public abstract class AbstractAPI {

    final static String REFRESH_TOKEN_NAME = "RefreshToken";
    final static String TOKEN_AUTHORIZATION = "Authorization";

    private Response createResponse(int httpStatus, Object entity, String refreshToken){

        if(refreshToken != null){
            return Response
                    .status(httpStatus)
                    .entity(entity)
                    .type(MediaType.APPLICATION_JSON)
                    .header(REFRESH_TOKEN_NAME, refreshToken)
                    .build();
        } else {
            return Response
                    .status(httpStatus)
                    .entity(entity)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    private Response createResponse(int httpStatus, String refreshToken){

        if(refreshToken != null){
            return Response
                    .status(httpStatus)
                    .header(REFRESH_TOKEN_NAME, refreshToken)
                    .build();
        } else {
            return Response
                    .status(httpStatus)
                    .build();
        }
    }

    protected Response executeRequest(Command cmd){
        return executeRequest(cmd, null);
    }

    private Response executeRequest(Command cmd, String token){

        Object object = cmd.execute();

        if(object.equals(Command.Result.FAILED)){
            return createResponse(cmd.httpOnCommandFailed(), token);
        } else if(object.equals(Command.Result.NO_OBJECT)){
            return createResponse(cmd.httpOnSuccess(), token);
        } else {
            return createResponse(cmd.httpOnSuccess(), object, token);
        }
    }

    protected Response executeRequestWithValidation(Command cmd, HttpHeaders httpHeaders){

        String token = httpHeaders.getHeaderString(TOKEN_AUTHORIZATION);
        if(token != null && !token.isEmpty()){

            TokenManager manager = TokenManager.getInstance();
            try {
                Long id = new Long(manager.verifyTokenAndGetUserId(token));
                String newToken = manager.createToken(id.longValue());
                return executeRequest(cmd, newToken);

            } catch (UnsupportedEncodingException e) {
                return Response.status(500).build();

            } catch (JWTVerificationException e){
                return Response.status(401).build();
            }
        }

        return Response.status(401).build();
    }
}
