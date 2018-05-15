package de.amos.mamb.rest;

import com.auth0.jwt.exceptions.JWTVerificationException;
import de.amos.mamb.rest.command.ObjectCommand;
import de.amos.mamb.rest.command.ResponseCommand;
import de.amos.mamb.session.TokenManager;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;

public abstract class AbstractAPI {

    final static String REFRESH_TOKEN_NAME = "RefreshToken";
    final static String TOKEN_AUTHORIZATION = "Authorization";

    private Response createResponse(int httpStatus, String entity, String refreshToken){

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

    protected Response executeRequest(ResponseCommand cmd){

        return executeRequest(null, cmd);
    }

    private Response executeRequest(String token, ResponseCommand cmd){

        String object = cmd.execute();

        if (object.equals(ResponseCommand.Result.FAILED)) {
            return createResponse(cmd.httpOnCommandFailed(), token);
        } else if (object.equals(ResponseCommand.Result.NO_STRING)) {
            return createResponse(cmd.httpOnSuccess(), token);
        } else {
            return createResponse(cmd.httpOnSuccess(), object, token);
        }
    }

    protected Response executeRequestWithValidation(HttpHeaders httpHeaders, ResponseCommand cmd){

        try {
            String newToken = createNewToken(httpHeaders);
            return executeRequest(newToken, cmd);
        } catch (UnsupportedEncodingException e) {
            return Response.status(500).build();
        } catch (JWTVerificationException e){
            return Response.status(401).build();
        }
    }

    protected <T extends Object> T executeRequest(HttpServletResponse response, ObjectCommand<T> cmd){

        return executeRequest(null, response, cmd);
    }

    protected <T extends Object> T executeRequest(String token, HttpServletResponse response, ObjectCommand<T> cmd){

        if(token != null){
            response.setHeader(REFRESH_TOKEN_NAME, token);
        }

        return cmd.execute();
    }

    protected <T extends Object> T executeRequestWithValidation(HttpHeaders httpHeaders, HttpServletResponse response, ObjectCommand<T> cmd){

        try {
            String newToken = createNewToken(httpHeaders);
            return executeRequest(newToken, response, cmd);
        } catch (UnsupportedEncodingException e) {
            response.setStatus(500);
        } catch (JWTVerificationException e){
            response.setStatus(401);
        }

        response.setStatus(401);
        return null;
    }

    private String createNewToken(HttpHeaders httpHeaders) throws UnsupportedEncodingException, JWTVerificationException{

        String token = httpHeaders.getHeaderString(TOKEN_AUTHORIZATION);
        if(token != null && !token.isEmpty()) {

            TokenManager manager = TokenManager.getInstance();
            Long id = manager.verifyTokenAndGetUserId(token);
            String newToken = manager.createToken(id);
            return newToken;
        }

        throw new JWTVerificationException("No token found.");
    }
}
