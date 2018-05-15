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
package de.amos.mamb.session;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;

public class TokenManager {

    protected static TokenManager INSTANCE = null;
    private final String SECRET = "INSERT_SECRET_HERE";
    private final String ISSUER = "MAMB";

    protected TokenManager(){

    }

    public static synchronized  TokenManager getInstance(){
        if(INSTANCE == null){
            INSTANCE = new TokenManager();
        }

        return INSTANCE;
    }

    public String createToken(long userId) throws UnsupportedEncodingException {

        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        String token = JWT.create()
                .withClaim("id", userId)
                .withIssuer(ISSUER)
                .withExpiresAt(createExpirationDate())
                .sign(algorithm);

        return token;
    }

    public Long verifyTokenAndGetUserId(String token) throws UnsupportedEncodingException, JWTVerificationException {

        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(ISSUER)
                .build();
        DecodedJWT decodedJWT = verifier.verify(token);
        Claim claim = decodedJWT.getClaim("id");
        return claim.asLong();
    }

    protected Date createExpirationDate(){
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR, 2);
        Date expirationDate = cal.getTime();
        return expirationDate;
    }
}
