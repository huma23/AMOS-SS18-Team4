package de.amos.mamb.model;

import com.google.appengine.repackaged.org.apache.commons.codec.digest.DigestUtils;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import java.security.NoSuchAlgorithmException;

@Entity
public class User extends PersistentObject{

    @Index
    private String email;
    private String password;

    public User(){
    }

    public User(String email, String password) throws NoSuchAlgorithmException {

        setEmail(email);
        setPassword(password);
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) throws NoSuchAlgorithmException {

        String hash = DigestUtils.sha256Hex(password);
        this.password = hash;
    }
}
