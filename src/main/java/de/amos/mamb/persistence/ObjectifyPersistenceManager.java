package de.amos.mamb.persistence;

import com.googlecode.objectify.Key;
import de.amos.mamb.model.PersistentObject;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class ObjectifyPersistenceManager extends PersistenceManager {

    protected ObjectifyPersistenceManager(){}

    @Override
    public PersistentObject getEntityWithId(Long id, Class clz) {
        //TODO

        return null;
    }

    @Override
    public boolean saveObject(PersistentObject object) {

        Key<PersistentObject> persistentKey = ofy().save().entity(object).now();

        if(persistentKey != null)
            return true;
        else
            return false;
    }

    @Override
    public List<PersistentObject> getEntityWithAttribute(String attribute, Object value, Class clz){

        List<PersistentObject> list = ofy().load().type(clz).filter(attribute, value).list();
        return list;
    }
}
