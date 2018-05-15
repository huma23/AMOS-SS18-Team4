package de.amos.mamb.persistence;

import de.amos.mamb.model.PersistentObject;

import java.util.List;

public abstract class PersistenceManager {

    public enum ManagerType {
        OBJECTIFY_MANAGER
    }

    protected static PersistenceManager INSTANCE = null;

    protected PersistenceManager(){}

    public static synchronized PersistenceManager getInstance(ManagerType type){
        if(INSTANCE == null){

            switch (type){
                case OBJECTIFY_MANAGER:
                    INSTANCE = new ObjectifyPersistenceManager();
            }
        }

        return  INSTANCE;
    }

    public abstract PersistentObject getEntityWithId(Long id, Class clz);

    public abstract List<PersistentObject> getEntityWithAttribute(String attribute, Object value, Class clz);

    public abstract boolean saveObject(PersistentObject object);

    public abstract List<PersistentObject> getAllEntities(Class clz);
}
