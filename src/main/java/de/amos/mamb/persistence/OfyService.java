package de.amos.mamb.persistence;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;
import de.amos.mamb.model.*;

/**
 * Inspired by:
 * https://github.com/dirkriehle/wahlzeit/blob/master/src/main/java/org/wahlzeit/services/OfyService.java
 *
 */
public class OfyService {

    static {
        factory().register(User.class);
        factory().register(Employee.class);
        factory().register(Material.class);
        factory().register(Vehicle.class);
        factory().register(ConstructionArea.class);
        factory().register(ConstructionLadder.class);
    }

    public static Objectify ofy(){
        return ObjectifyService.ofy();
    }

    public static ObjectifyFactory factory(){
        return ObjectifyService.factory();
    }
}
